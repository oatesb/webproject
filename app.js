var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs')

var ourData = JSON.parse(fs.readFileSync('G:/WebProject/public/data/ourData.json', 'utf8'));

console.log('####################################');
console.log(ourData);
console.log('####################################');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

app.use(cors());


// ###################### jobs Routes ###########################
app.get("/jobs-api", function(req, res) {
    res.json(ourData);
});

// if we add new projects do something like this..
app.post("/jobs-api", function(req, res) {
    ourData.push(req.body);
    res.json(ourData);
});

// if we delete do something like this.
app.delete("/jobs-api/:project_name", function (req, res) {
    ourData = ourData.filter(function(definition) {
        return definition.project_name.toLowerCase() !== req.params.project_name.toLowerCase();
    });
    res.json(ourData);
});

// ####################### project Routes ############################

app.get("/projects/:project_id", function(req, res) {
    ourDataTemp = ourData.filter(function (definition) {
        return definition.project_id.toLowerCase() === req.params.project_id.toLowerCase();
    });
    res.json(ourDataTemp);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;