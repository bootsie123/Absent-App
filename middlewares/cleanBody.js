const sanitizer = require("sanitizer");

module.exports = (req, res, next) => {
  try {
    for (let [key, value] of Object.entries(req.body)) {
      req.body[key] = sanitizer.sanitize(value);
    }

    next();
  } catch (err) {
    next(err);
  }
}
