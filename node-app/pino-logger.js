const fs = require('fs');
const pino = require('pino');
const pinoms = require('pino-multi-stream');


const streams = [
    { stream: process.stdout },
    { stream: fs.createWriteStream('./log/pino-logger.log', { flags: 'a' }) },
]

module.exports = pino({
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            level: (label) => {
                return { level: label.toUpperCase() };
            },
        },

}
    , pinoms.multistream(streams)
)

