const mongoose = require('mongoose');
const { database } = require('../config');

let { retryTimes } = database;
mongoose.Promise = Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(database.uri, { useNewUrlParser: true });
    console.info(`database connected: ${database.uri}`);
  }
  catch (err) {
    if (retryTimes) {
      retryTimes--;
      connectDB();
    }
    else {
      console.warn(`connect database failed for ${database.retryTimes} retry times`);
      throw err;
    }
  }
};

module.exports = connectDB;