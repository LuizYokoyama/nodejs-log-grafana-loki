const { createLogger, transports, format } = require('winston');

//change default log format:
const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${info.message}`
}))

const logger = createLogger({
    //uncomment to change default log format:
    // format: customFormat,
    transports: [
        new transports.Console({level: 'silly'}),
        new transports.File({ filename: './log/app.log', level: 'silly'})
    ]
});

module.exports = logger;