const crypto = require('crypto');
const mongoose = require('mongoose');
const rl = require('readline').createInterface(process.stdin, process.stdout);
const User = require('./models/user.js');
const config = require('./config.js');

mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.database, { useMongoClient: true });

const questions = [
  { question: 'Who are you ? ', answer: '' },
  { question: 'Please enter your password 1 : ', answer: '' },
  { question: 'Please enter your password 2 : ', answer: '' }
];
let questionsCount = 0;

const setUpPass = (username, password1, password2) => {
  const user = new User({ username });
  user.setUpPassword(password1, password2);
  const { salt1, salt2, hash1, hash2 } = user;
  User.findOneAndUpdate({ username }, { salt1, salt2, hash1, hash2 }, { upsert: true }, err => {
    if (err) {
      throw err;
      process.exit(1);
    }
    console.log('set up success ! ');
    process.exit(0);
  });
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

connection.then(db => {
  ask(questions[questionsCount].question);
});