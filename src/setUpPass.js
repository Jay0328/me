const crypto = require('crypto');
const mongoose = require('mongoose');
const rl = require('readline').createInterface(process.stdin, process.stdout);
const User = require('./models/user.js');
const config = require('./config.js');

mongoose.Promise = global.Promise;

const questions = [
  { question: 'Who are you ? ', answer: '' },
  { question: 'Please enter your password 1 : ', answer: '' },
  { question: 'Please enter your password 2 : ', answer: '' }
];
let questionsCount = 0;

async function setUpPass(username, password1, password2) {
  try {
    const user = new User({ username });
    user.setUpPassword(password1, password2);
    const { salt1, salt2, hash1, hash2 } = user;
    await User.findOneAndUpdate({ username }, { salt1, salt2, hash1, hash2 }, { upsert: true });
    console.log('set up success ! ');
    process.exit(0);
  }
  catch (err) {
    throw err;
    process.exit(1);
  }
};

const ask = question => {
  rl.question(question, answer => {
    questions[questionsCount].answer = answer;
    questionsCount++;
    if (questionsCount === questions.length)
      setUpPass(questions[0].answer, questions[1].answer, questions[2].answer);
    else ask(questions[questionsCount].question);
  });
};

async function run() {
  try {
    await mongoose.connect(config.database, { useMongoClient: true });
    ask(questions[questionsCount].question);
  }
  catch (err) {
    throw err;
    process.exit(1);
  }
}

run();