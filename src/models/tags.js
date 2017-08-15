const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const tagsSchema = new Schema({
  tagName: {
    type: String,
    required: true,
    unique: true
  },
  articles: [{ type: ObjectId, ref: 'User' }]
});

const Tags = mongoose.model('Tags', tagsSchema, 'Tags');

module.exports = Tags;