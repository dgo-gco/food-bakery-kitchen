const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose.connect(MONGO_URI)
  .then(() => {
      console.log('successfully connected to the db');
  })
  .catch((error) => {
      console.log('database connection failed');
      console.error(error);
  })
};