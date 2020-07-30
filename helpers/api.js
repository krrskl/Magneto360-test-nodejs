const request = require("request");

module.exports = get = (url) => {
  return new Promise((resolve, reject) => {
    request(url, function (error, _, body) {
      if (error) {
        reject(("Error", error.message));
      }
      resolve(JSON.parse(body));
    });
  });
};
