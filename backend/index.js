const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authEnrollRoute = require('./routes/authEnroll');
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


app.use('/api',authEnrollRoute)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
