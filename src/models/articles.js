const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
    type: [{ type: ObjectId, ref: 'Tags' }],
    required: true
  }
});

const Articles = mongoose.model('Articles', articlesSchema, 'Articles');

module.exports = Articles;