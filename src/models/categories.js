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

categoriesSchema.statics.getCategories = async function () {
  return await this
    .aggregate()
    .match({})
    .project({
      categoryName: '$categoryName',
      articlesCount: { $size: '$articles' }
    });
};

categoriesSchema.statics.getCategoryArchive = async function (categoryName) {
  const archive = await this
    .findOne({ categoryName })
    .populate({
      path: 'articles',
      select: ['year', 'month', 'day', 'title', 'url'],
      options: {
        sort: { year: 'desc', month: 'desc', day: 'desc' }
      }
    })
    .exec();
  return archive;
};

const Categories = mongoose.model('Categories', categoriesSchema, 'Categories');

module.exports = Categories;