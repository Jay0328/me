module.exports = {
  secret: '<Your secret>',
  server: {
    port: '<Your server port>',
    staticConfig: '<Your static file config, e.g. max-age>'
  },
  database: {
    uri: '<Your database uri>',
    retryTimes: '<The times retrying to connect datebase>'
  }
};