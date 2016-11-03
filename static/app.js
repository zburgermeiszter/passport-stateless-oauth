var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// configure Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.listen(3000);