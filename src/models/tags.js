const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tagsSchema = new Schema({
  tagName: {
    type: String,
    required: true,
    unique: true
  },
  articles: {
    type: [{ type: ObjectId, ref: 'Articles' }],
    required: true
  }
});

tagsSchema.statics.getArticlesInTags = async function () {
  return await this
    .find()
    .populate({
      path: 'articles',
      select: ['year', 'month', 'day', 'title', 'url'],
      options: {
        sort: { year: 'desc', month: 'desc', day: 'desc' }
      }
    })
    .exec();
};

const Tags = mongoose.model('Tags', tagsSchema, 'Tags');

module.exports = Tags;