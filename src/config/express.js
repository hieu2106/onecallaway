const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('../routers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// cors  configuration
const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    exposedHeaders: ['Content-Length', 'Authorization', 'Accept-Language'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
