var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");

var app = express();

var server = require('http').Server(app);

var port = process.env.PORT || 4000;

// to support JSON-encoded bodies
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

// Require item routes
const routes = require('./src/route/item.route')

// using as middleware
app.use('/dichvu', routes)

// root path
app.get("/", (req, res, next) => {
	res.json("What's up?");
});

server.listen(port, () => {
    console.log('Listening on port: ' + port);
});