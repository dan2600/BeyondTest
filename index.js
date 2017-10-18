var express = require('express');
var http = require("http");
var https = require("https");
var app = express()
var sass = require('node-sass-middleware');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

//Data URL for JSON
var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw';

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var port = process.env.PORT || 8080;

// routes

//we Could just access the playlist from the frontend but might as well build a custom API endpoint. 
app.get('/api/playlist', function(req, res) {
    //This would be built as an actual API call. 
    https.get(url, function(r2) {
        var body = '';

        r2.on('data', function(chunk) {
            body += chunk;
        });
        r2.on('end', function() {
            var response = JSON.parse(body);
            console.log("Got a response: ", response.picture);
            res.json(response); // return all todos in JSON format
        });
    }).on('error', function(e) {
        console.log("Got an error: ", e);
    });
    //Load the fontend
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
});
app.listen(port);
console.log("App listening on port 8080");