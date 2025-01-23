const winston = require("winston")
const format = winston.format;

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => `[${info.level}] - ${info.timestamp} - ${info.message}`),
    format.errors({ stack: true }),
    //format.json()
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'warning.log', level: 'warning' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' })
  ]
});

module.exports = logger