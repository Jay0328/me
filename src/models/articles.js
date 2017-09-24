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
    type: ObjectId,
    ref: 'Categories',
    required: true,
  },
  tags: {
    type: [{ type: ObjectId, ref: 'Tags' }],
    required: true
  }
});

articlesSchema.statics.getArticlesInPage = async function (page) {
  return await this
    .find()
    .sort({ year: 'desc', month: 'desc', day: 'desc' })
    .skip((page - 1) * 10)
    .limit(10)
    .populate('tags', 'tagName')
    .exec();
};

articlesSchema.statics.getArticle = async function (year, month, day, url) {
  return await this
    .findOne({ year, month, day, url })
    .populate('tags', 'tagName')
    .exec();
};

articlesSchema.statics.getArchive = async function () {
  return await this
    .find()
    .select(['year', 'month', 'day', 'title', 'url'])
    .sort({ year: 'desc', month: 'desc', day: 'desc' });
};

const Articles = mongoose.model('Articles', articlesSchema, 'Articles');

module.exports = Articles;