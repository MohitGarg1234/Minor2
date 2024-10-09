const express = require("express");
const router = express.Router();
const multer = require("multer");
const Article = require('../models/Articles')

// Multer configuration for storing images
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },                    
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const sanitizedOriginalname = file.originalname.replace(/[^a-zA-Z0-9\-_.]/g, ''); 
        if (ext) {
          cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname.replace(ext, '') + ext);
        } 
        else if (req.body.post_type == 3) {
          cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()).toString() + "-" + sanitizedOriginalname + ".mp4");
        } 
        else {
          cb(null, file.fieldname + "-" + uuidv4() + Number(Date.now()) + "-" + sanitizedOriginalname.replace(ext, '') + ext);
        }
      },
      onError: function (err, next) {
        console.log('error', err);
        next(err);
      }
    });

const upload = multer({ storage });

// Route to add a new article with image upload
router.post("/articles", upload.single("image"), async (req, res) => {
  try {
    const { content, author } = req.body;
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }
    const article = new Article({
      content,
      author,
      image,
    });
    await article.save();

    res.status(201).json({ article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to fetch all articles
router.post('/fetchArticles', async (req, res) => {
    try {
      const articles = await Article.find({}).populate('author');
      const reversedData = articles.reverse();
      res.status(200).json({articles : reversedData});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Route to handle both like and dislike
router.post('/:articleId/react/:id', async (req, res) => {
  const { reactionType } = req.body; 
  const articleId = req.params.articleId;
  const userId = req.params.id;
  try {
    let article = await Article.findById(articleId).populate('author');
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    // Check if the user has already reacted
    const existingReaction = article.reactions.find(
      reaction => reaction.user.toString() === userId
    );
    if (existingReaction) {
      // User has already reacted, update the reaction
      if (existingReaction.type === reactionType) {
        // User is clicking the same reaction again, remove the reaction
        article.reactions = article.reactions.filter(
          reaction => reaction.user.toString() !== userId
        );
        if (reactionType === 'like' && article.likes>0) {
          article.likes--;
        } else if(article.dislikes>0){
          article.dislikes--;
        }
      } else {
        // User is changing the reaction
        existingReaction.type = reactionType;
        if (reactionType === 'like') {
          article.likes++;
          if(article.dislikes>0){
            article.dislikes--;
          }
        } else {
          article.dislikes++;
          if(article.likes>0){
            article.likes--;
          }
        }
      }
    } else {
      // User is reacting for the first time
      article.reactions.push({ user: userId, type: reactionType });
      if (reactionType === 'like') {
        article.likes++;
      } else {
        article.dislikes++;
      }
    }

    await article.save();
    res.json({ article });
  } catch (error) {
    console.error('Error updating reaction:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
