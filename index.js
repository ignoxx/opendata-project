var port = process.env.PORT || 3000;
var nunjucks = require('nunjucks');
var express = require('express');
var app = express();
var path = __dirname;

app.use('/bootstrap', express.static(path + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(path + '/node_modules/jquery/dist/'));
app.use('/popper', express.static(path + '/node_modules/popper.js/dist/'));
app.use('/d3', express.static(path + '/node_modules/d3/dist'));
app.use('/data', express.static(path + '/static/data/'));
app.use('/scripts', express.static(path + '/static/scripts/'));
app.use('/style', express.static(path + '/static/style/'));


nunjucks.configure('static/', {
    autoescape: true,
    express: app
});

app.get('/', function (req, res) {
    res.render(path + "/static/pages/index.html", {home_active: true})    
});

app.get('/about', function (req, res) {
    res.render(path + "/static/pages/about.html", {about_active: true})    
});

app.listen(port, function () {
    console.log('Webserver listening on port ' + port);
});