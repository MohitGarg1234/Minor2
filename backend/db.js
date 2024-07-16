const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI
mongoose.set('strictQuery', true);
const connectToMongo = () => {
  mongoose
  .connect(mongoURI)
  .then(() => console.log("connection success"))
  .catch((err) => console.log(err));
};
module.exports = connectToMongo;