const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secret } = require('../config.js');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash1: {
    type: String,
    required: true
  },
  hash2: {
    type: String,
    required: true
  },
  salt1: {
    type: String,
    required: true
  },
  salt2: {
    type: String,
    required: true
  }
});

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, secret);
};

userSchema.methods.setUpPassword = function (password1, password2) {
  this.salt1 = crypto.randomBytes(16).toString('hex');
  this.salt2 = crypto.randomBytes(16).toString('hex');
  this.hash1 = crypto.pbkdf2Sync(password1, this.salt1, 1000, 64, 'sha512').toString('hex');
  this.hash2 = crypto.pbkdf2Sync(password2, this.salt2, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password1, password2) {
  return this.hash1 === crypto.pbkdf2Sync(password1, this.salt1, 1000, 64, 'sha512').toString('hex')
    && this.hash2 === crypto.pbkdf2Sync(password2, this.salt2, 1000, 64, 'sha512').toString('hex');
};

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;