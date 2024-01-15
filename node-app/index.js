const express = require("express");
const app = express();
// const logger = require('./logger');  //winston logger

const expressPinoLogger = require('express-pino-logger');  //pino logger
const logger = require('./pino-logger');

const SERVICE_PORT = 5556;

const loggerMidlleware = expressPinoLogger({
    logger: logger,
    autoLogging: false,
});

app.use(loggerMidlleware);


app.use(express.json())


app.get('/200', (req, res) => {
    logger.info("200 ok");
    logger.info('GET route is accessed')
    res.sendStatus(200);
})

app.get('/404', (req, res) => {
    logger.error("error 404");
    res.sendStatus(404);
})



function alwaysThrowError() {
    throw new Error('processing error');
}


app.get('/error', (req, res) => {
    try {
        alwaysThrowError();
    } catch (err) {
        logger.error(err, 'An unexpected error occurred while processing the request');
    }
})


// O consul acessa este endpoint para saber se este serviço está rodando
app.get('/health', (req, res) => {
    logger.info("200 health");
    res.sendStatus(200);
})

//registra log a cada intervalo em ms
setInterval(function () {
    logger.error("error 500");
}, 100)

//registra log a cada intervalo em ms
setInterval(function () {
    logger.info("ok");
}, 300)


logger.error("error");
logger.warn("warn");
logger.info("info");
//logger.verbose("verbose"); //only exists on winston logger
logger.debug("debug");
//logger.silly("silly");  //only exists on winston logger

app.listen(parseInt(SERVICE_PORT, 10), () => {
    console.log(`Listening for requests on http://localhost:${SERVICE_PORT}`);
});