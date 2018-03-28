const { readFile, readFileSync } = require('fs');
const path = require('path');

exports.readArticlePreviews = articles => new Promise((resolve, reject) => {
  const articleNum = articles.length;
  if (articleNum === 0) resolve(articles);
  let count = articleNum;
  let ret = [...articles];
  for (let i = 0; i < articleNum; i++) {
    const { year, month, day, title } = articles[i];
    const filePath = path.resolve(__dirname, `../../blog/articles/${year}-${month}-${day}-${title}.md`);
    readFile(filePath, 'utf-8', (err, content) => {
      if (err) reject(err);
      ret[i] = { ...ret[i].toObject(), preview: content.slice(0, content.indexOf('<a id="more"></a>')) };
      count--;
      if (count <= 0) resolve(ret);
    });
  }
});

exports.readArticleContent = async ({ year, month, day, title }) => {
  const filePath = path.resolve(__dirname, `../../blog/articles/${year}-${month}-${day}-${title}.md`);
  return await readFileSync(filePath, 'utf-8');
};
