const winston = require("winston");
const expressWinston = require("express-winston");
require("winston-mongodb");
const config = require("config");

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.MongoDB({
      db: config.get("dbUri"),
      options: { useUnifiedTopology: true },
      collection: "itinfo",
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.metadata()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) {
    return false;
  },
});
