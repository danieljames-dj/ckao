var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(express.static('public'));
app.use(bodyparser.json());
var mysql = require("mysql");
var jwt = require('jsonwebtoken');
app.set('superSecret', 'tkmce87');
var con = mysql.createConnection({
  host: "localhost",
  user: "dany",
  password: "emmaus",
  database: "ckao"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Database Connection established');
});
app.post('/addData',function(req, res) {
	// console.log(req.body.inputs);
	var statement = 'insert into parts value (';
	if (req.body.inputs[3] == "") {
		req.body.inputs[3] = req.body.inputs[4];
		for (var i = 0; i < req.body.inputs[1].length; i++) {
			if (req.body.inputs[1][i] != ' ') {
				req.body.inputs[3] += req.body.inputs[1][i];
			}
		}
	}
	for (var i = 0; i < 19; i++) {
		statement += `'` + req.body.inputs[i] + `',`;
	}
	function makeid() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		
		var final = "";
		while (1) {
			console.log("iteration\n")
			if (final != "") return final;
			text = "";
			for (var i = 0; i < 5; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			// con.query(`select * from parts where passcode = '` + text + `'`, function(err, rows) {
			// 	if (rows.length == 0) final = text;
			// });
			return text;
		}
	}
	var pass = makeid();
	statement += `'` + pass + `')`;
	// con.query(`select * from parts where passcode = '` + pass + `'`, function(err, rows) {
	// 	if (rows.length > 0) {
	// 		pass = ma
	// 	}
	// 	// console.log(rows);
	// 	// for (var i = 0; i < rows.length; i++) {
	// 	// 	if (rows[i].name.indexOf(req.body.name)==-1) {
	// 	// 		rows.splice(i,1);
	// 	// 		i--;
	// 	// 	}
	// 	// }
	// 	// res.json(rows);
	// });
	console.log(statement);
	con.query(statement, function(err, rows) {
		// console.log(rows);
		// for (var i = 0; i < rows.length; i++) {
		// 	if (rows[i].name.indexOf(req.body.name)==-1) {
		// 		rows.splice(i,1);
		// 		i--;
		// 	}
		// }
		// res.json(rows);
	});
})
app.post('/setDet',function(req, res) {
	console.log(req.body);
	if (req.body.e333) {
		con.query('update parts set e333 = "' + req.body.e333 + '" where WCAID = "' + req.body.id + '"');
	}
	res.json({
		success: true
	});
})
app.post('/getDet',function(req, res) {
	console.log(req.body.id);
	con.query('select * from parts', function(err, rows1) {
		con.query('select * from heats', function(err, rows2) {
			var list = [];
			var options = {};
			var i, j, k;
			for (i = 0; i < rows1.length; i++) {
				if (rows1[i].WCAID == req.body.id) break;
			}
			if (i == rows1.length) {
				res.json({
					success: false
				});
			} else {
				for (j = 0; j < rows2.length; j++) {
					if (rows2[j].event == 'e333' && rows1[i].e333 != '0') {
						options = rows2[j];
						var c = 0;
						for (k = 0; k < rows1.length; k++) {
							if (rows1[k].e333 == options.id) c++;
						}
						if (c < 30) list.push(options);
					}
				}
				if (list.length == 0) {
					res.json({
						success: false
					});
				} else {
					res.json({
						name: rows1[i].Name,
						list: list
					});
				}
			}
		});
	});
})
app.listen(8080, function() {
	console.log("Server listening to port 8080");
});
