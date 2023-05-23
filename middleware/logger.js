// @desc Logs info to console
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  //call next so it moves to the next function
  next();
}

module.exports = logger;