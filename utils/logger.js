const winston = require('winston');
const config = require('../configuration/config')
// winston.emitErrs = true

// created separate httpLogger because we want to log express request separatly
let httpLogger = new winston.createLogger({
  transports: [new winston.transports.File({
    filename: config.get('logger.httpLogFileName'),
    json: true,
    maxsize: config.get('logger.logFileSize'),
    maxFiles: 5,
    colorize: false
  })],
  exitOnError: false
})


// define the custom settings for each transport (file, console)
var options = {
    file: {
      level: 'info',
      filename: config.get('logger.logFileName'),
      handleExceptions: true,
      json: true,
      maxsize:  config.get('logger.logFileSize'),
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
  



var logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
  

// appender function to use winston file transport
let stream = {
  write: function (message, encoding) {
    httpLogger.info(message)
  }
}



module.exports = logger