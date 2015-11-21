var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');
var express = require('express');
var fs = require('fs');
var http = require('http');

var config = require('./webpack.config');
var PORT = 3333;

var app = express();
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use('/static', express.static('client'));

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


var server = http.createServer(app);
server.listen(PORT, function(error) {
    if (error) {
        console.error(error);
    }
    else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT);
    }
});
