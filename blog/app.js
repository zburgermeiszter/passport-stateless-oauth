var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var partials = require('express-partials');

var app = express();

// configure Express
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.listen(3000);