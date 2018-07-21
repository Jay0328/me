const { writeFileSync } = require('fs');
const path = require('path');

exports.uploadImage = async (type, imageName, url) => {
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  const matches = url.match(regex);
  const data = matches[2];
  const buffer = new Buffer(data, 'base64');
  const filePath = path.resolve(__dirname, `../../blog/${type}/${imageName}.jpg`);
  await writeFileSync(filePath, buffer);
};