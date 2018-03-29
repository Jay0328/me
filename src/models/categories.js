const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const categoriesSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  articles: {
    type: [{ type: ObjectId, ref: 'Articles' }],
    required: true
  }
});

categoriesSchema.statics.getCategoriesAndArticlesCount = async function () {
  return await this
    .aggregate()
    .match({})
    .project({
      categoryName: '$categoryName',
      articlesCount: { $size: '$articles' }
    });
};

categoriesSchema.statics.getArticlesInCategory = async function (categoryName) {
  return await this
    .findOne({ categoryName })
    .populate({
      path: 'articles',
      select: ['year', 'month', 'day', 'title', 'url'],
      options: {
        sort: { year: 'desc', month: 'desc', day: 'desc' }
      },
      populate: { path: 'tags', select: ['tagName'] }
    })
    .exec();
};

categoriesSchema.statics.getCategoryByNameOrNewOne = async function (categoryName) {
  try {
    const category = await this.findOne({ categoryName });
    return category || new this({ categoryName });
  }
  catch (err) {
    throw err;
  }
};

categoriesSchema.methods.addArticleToCategory = async function (article) {
  this.articles.push(article);
  await this.save();
};

const Categories = mongoose.model('Categories', categoriesSchema, 'Categories');

module.exports = Categories;