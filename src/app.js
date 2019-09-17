const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const createError = require('http-errors');

const app = express();
const router = express.Router();

app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../config/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app, router);

const port = parseInt(process.env.PORT, 10) || 8080;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

module.exports = app;
