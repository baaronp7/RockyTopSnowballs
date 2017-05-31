var express = require('express');
var partial = require('express-partial');

var app = express();
var fbAIP = require('./js/facebookGraphAPI');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(partial());

var config = require("./config.json");

var pageID = config.facebookGraphAPI.pageID;

app.get('/', function (req, res) {
    fbAIP.getPosts(pageID, function(postsJSON) {
        fbAIP.getImages(pageID, function(imagesJSON) {
            if(typeof JSON.parse(imagesJSON).error == 'undefined') {
                res.render('pages/posts', {
                    imagesJSON: imagesJSON,
                    postsJSON: postsJSON
                });
            }
            else {
                res.send(JSON.parse(imagesJSON).error.message);
            }
        });
    });
});

app.get('/menu', function (req, res) {
    res.render('pages/menu', {});
});

app.get('/reviews', function (req, res) {
    fbAIP.getReviews(pageID, function(reviewsJSON) {
        if(typeof JSON.parse(reviewsJSON).error == 'undefined') {
            res.render('pages/posts', {
                reviewsJSON: reviewsJSON
            });
        }
        else {
            res.send(JSON.parse(reviewsJSON).error.message);
        }
    });
});

app.get('/about', function (req, res) {
    res.render('pages/about', {});
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
