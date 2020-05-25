var nunjucks = require('nunjucks');
var express = require('express');
var app = express();
var path = __dirname;

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));


nunjucks.configure('static/', {
    autoescape: true,
    express: app
});

app.get('/', function (req, res) {
    res.render(path + "/static/pages/index.html")
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});