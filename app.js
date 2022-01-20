const express = require('express');
const app = express();


// PARSER FOR JSON DATA
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded ( {
	extended : true
}));
app.use(bodyParser.json());


// CONFIGURE SERVER
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next) {
    res.render('public/index.html');
});


app.listen(3000);
console.log("waiting on localhost:3000");



