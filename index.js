var nunjucks = require('nunjucks');
var express = require('express');
// var mysql = require('mysql');
var app = express();
var path = __dirname;

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));
app.use('/d3', express.static(__dirname + '/node_modules/d3/dist'));
app.use('/data', express.static(__dirname + '/static/data/'));
app.use('/scripts', express.static(__dirname + '/static/scripts/'));
app.use('/style', express.static(__dirname + '/static/style/'));




// var con = mysql.createConnection({
//     host: "sql7.freemysqlhosting.net",
//     user: "sql7343374",
//     password: "ymtK3DC6dk",
//     database: 'sql7343374'
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

nunjucks.configure('static/', {
    autoescape: true,
    express: app
});

app.get('/', function (req, res) {
    res.render(path + "/static/pages/index.html")
 
    // con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    // if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
    // });
    
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});