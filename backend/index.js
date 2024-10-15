const  {createServer} = require("http");
const {Server} = require("socket.io");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authEnrollRoute = require('./routes/authEnroll');
const jobPostRoute = require('./routes/jobPost');
const connectionRoute = require('./routes/connectionRoute');
const messageRoute = require('./routes/messageRoute.js')
const articlesRoute = require('./routes/articlesRoute.js')
const experienceRoute = require('./routes/experienceRoute.js')
const skillRoute = require('./routes/skillRoute.js')
const authAdminRoutes = require('./routes/AdminAuth.js')
const notificationRoutes = require('./routes/NotificationRoute.js')
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
// Connect to MongoDB
const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT"],
    credentials: true,  
  }
});
const userSocketMap = new Map();
io.on("connection",(socket)=>{
  console.log("Client connected",socket.id);
  socket.emit("Welcome","Welcome to the server");
  socket.on("join", (userId) => {
    userSocketMap.set(userId, socket.id); // Map user ID to socket ID
    console.log(`User ${userId} joined with socket ID: ${socket.id}`);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    // Find and remove the disconnected user from the map
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
})
// Pass io and userSocketMap to your routes
app.use((req, res, next) => {
  req.io = io;
  req.userSocketMap = userSocketMap;
  next();
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT"],
    credentials: true,  
  }));
app.use(bodyParser.json());

app.use(express.static(__dirname+"/"))

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
app.use('/api',articlesRoute)
app.use('/api',experienceRoute)
app.use('/api',skillRoute)
app.use('/api',authAdminRoutes); 
app.use('/api',notificationRoutes); 

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
