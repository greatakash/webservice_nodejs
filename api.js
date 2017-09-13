var express=require('express');
var api = express();
var mysql = require('mysql');
var sql = '';
var http = require('http');
var url = require('url') ;
var util = require('util');
var formidable = require('formidable');
var fs = require("fs");
var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "interviewportal"
		});

//api.set('view engine','ejs');
/* use res.write function once for one function,below i had use twice to understand both */
api.get('/get',function(req,res){
		res.writeHead(200,{'Content-Type':'text/html'});
		fs.readFile("file.txt", 'utf8',function(err,data){
			//console.log(data);
			//res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			//return res.end();
		});
		sql = "SELECT * FROM `users`";
		con.connect(function(err) {
		//if (err) throw err;
		con.query(sql, function (err, users) {
			//if (err) throw err;
			res.write(JSON.stringify(users));	
			return res.end();
		});
	});
	
});
api.post('/post',function(req,res){
		var form = new formidable.IncomingForm();
		var token_val = Date.now();
    form.parse(req, function (err, fields, files) {
		//res.write('File uploaded');
		sql = "INSERT INTO `users`(`email`) VALUES ('"+fields.email_id+"')";
		//this below commented line will display all data coming as post method
		/* res.end(util.inspect({
			fields: fields
		})); */
		con.connect(function(err) {
			//if (err) throw err;
			con.query(sql, function (err, result) {
				//if (err) throw err;
				//console.log("value inserted");
				usersData = result;
			});
			
		});
		
		res.end('File uploaded');
    });
});

api.listen(8070);