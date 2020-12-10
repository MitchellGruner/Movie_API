var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) =>{
	res.render("search");
});

app.get("/results", (req, res) =>{
	
	var requestResult = req.query.search;
	var url = "http://omdbapi.com/?s=" + requestResult + "&apikey=thewdb";
	
	request(url, (error, response, body) =>{
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
	});
});

app.get("*", (req, res) =>{
	res.send("Sorry!  No results were found");
});

app.listen(3000, () => {
	console.log("Movie app has started");
});