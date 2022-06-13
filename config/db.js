'use strict';

const mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'qlnv'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL!");
});

module.exports = con;