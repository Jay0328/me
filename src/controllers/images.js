const { uploadImage } = require('../utils/handleImage');

exports.uploadImage = async ctx => {
  const { body } = ctx.request;
  const { type, imageName, url } = body;
  try {
    if (!type || !imageName || !url) {
      ctx.throw(400, 'Type, ImageName and url should not be empty');
    }
    await uploadImage(type, imageName, url);
    ctx.status = 200;
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};
