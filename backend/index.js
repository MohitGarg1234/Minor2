const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authEnrollRoute = require('./routes/authEnroll');
const jobPostRoute = require('./routes/jobPost');
const connectionRoute = require('./routes/connectionRoute');
const messageRoute = require('./routes/messageRoute.js')
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/JiitAlumniPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});
app.use(cors());
app.use(bodyParser.json());

// Init gfs
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://127.0.0.1:27017/JiitAlumniPortal',
  file: (req, file) => {
    return {
      filename: 'profile-' + Date.now() + path.extname(file.originalname),
      bucketName: 'uploads'
    };
  }
});
const upload = multer({ storage });


app.use('/api',authEnrollRoute(upload, gfs, mongoose))
app.use('/api',jobPostRoute)
app.use('/api',connectionRoute)
app.use('/api',messageRoute)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
