const connectDB = require('./server/utils/connectDB');
const createServer = require('./server/utils/createServer');

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