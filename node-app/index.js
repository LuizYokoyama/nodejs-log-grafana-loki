const express = require("express");
const app = express();
const logger = require('./logger');
const SERVICE_PORT = 5556;

app.use(express.json())

app.get('/200', (req, res) => {
    logger.info("200 ok");
    res.sendStatus(200);
})

app.get('/404', (req, res) => {
    logger.error("error 404");
    res.sendStatus(404);
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
logger.verbose("verbose");
logger.debug("debug");
logger.silly("silly");

app.listen(parseInt(SERVICE_PORT, 10), () => {
    console.log(`Listening for requests on http://localhost:${SERVICE_PORT}`);
});