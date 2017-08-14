const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const articlesSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true
  },
  intro: String
});

const Articles = mongoose.model('Articles', articlesSchema, 'Articles');

module.exports = Articles;