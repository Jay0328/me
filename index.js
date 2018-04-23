const connectDB = require('./src/utils/connectDB');
const createServer = require('./src/utils/createServer');

const run = async () => {
  try {
    await connectDB();
    createServer();
  }
  catch (err) {
    throw err;
  }
};

run();