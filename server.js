var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var apiRouting = require('./app/routing/apiRoutes.js');
var htmlRouting = require('./app/routing/htmlRoutes.js');
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', htmlRouting);
// app.use("/assets", express.static(__dirname + './public/assets'));
app.use('/api', apiRouting)


app.listen(PORT, function(){
    console.log(`listening on ${PORT}`)
})