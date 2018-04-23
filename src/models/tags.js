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

tagsSchema.statics.getTagsByNameOrNewSome = async function (tags) {
  try {
    const ret = [];
    await tags.reduce(async (acc, tagName) => {
      const tag = await this.findOne({ tagName }) || new this({ tagName });
      ret.push(tag);
      return acc;
    }, null);
    return ret;
  }
  catch (err) {
    throw err;
  }
};

tagsSchema.methods.addArticleToTag = async function (article) {
  this.articles.push(article);
  await this.save();
};

const Tags = mongoose.model('Tags', tagsSchema, 'Tags');

module.exports = Tags;