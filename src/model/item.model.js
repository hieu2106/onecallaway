'use strict';

var con = require('./../../config/db');

// Item Object

var Item = function(dichvu){
  this.id = dichvu.id;
  this.madv = dichvu.madv;
  this.tendv = dichvu.tendv;
  this.dongia = dichvu.dongia;
  this.mota = dichvu.mota;
};

// Define CRUD Operations Functions

Item.findById = function (id, result) {
	let sql = 'SELECT * FROM dichvu WHERE id = ?';
	
	con.query(sql, id, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log(row);
		result(null, row);
	});
};

Item.findByName = function (madv, result) {
	let sql = 'SELECT * FROM dichvu WHERE madv = ?';
	
	con.query(sql, madv, (err, rows, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log('rows: ', rows);
		result(null, rows);
	});
};

Item.findAll = function (result) {
	let sql = 'SELECT * FROM dichvu';
	
	con.query(sql, (err, rows, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log(rows);
		result(null, rows);
	});
};

Item.create = function (newItem, result) {	
	let data = [newItem.madv, newItem.tendv, newItem.dongia, newItem.mota];
	
	let sql = 'INSERT INTO items(madv, tendv, dongia, mota) VALUES(?, ?, ?, ?)';
	
	con.query(sql, data, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log(row.insertId);
		result(null, row.insertId);
	});
};

Item.update = function(item, result){
	let data = [item.item_name, item.item_desc, item.item_price, item.item_id];
	
	let sql = 'UPDATE items SET item_name = ?, item_desc = ?, item_price = ? WHERE item_id = ?';
	
	con.query(sql, data, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log(row.affectedRows);
		result(null, row.affectedRows);
	});
};

Item.delete = function(id, result){
	let sql = 'DELETE FROM dichvu WHERE id = ?';
	
	con.query(sql, id, (err, row, fields) => {
		console.log("error: ", err);
		if (err) result(err, null);
		
		console.log(row.affectedRows);
		result(null, row.affectedRows);
	});
};

module.exports= Item;