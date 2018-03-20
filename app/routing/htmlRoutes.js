var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

module.exports = (function () {

    var router = express.Router();
    router.use(express.static(path.join(__dirname, "../public")));
    router.get('/survey', function (req, res) {
        res.redirect("survey.html");
    })
    router.get('/', function (req, res) {
        res.redirect("home.html");
    })

    return router;
})()

