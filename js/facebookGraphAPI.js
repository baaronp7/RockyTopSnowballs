var request = require("request");
var config = require("../config.json");

exports.getPosts = function(pageID, callback) {
    var options = { 
        method: 'GET',
        url: 'https://graph.facebook.com/v2.9/'+pageID+'/feed',
        qs: { access_token: config.facebookGraphAPI.apiKey },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
};

exports.getImages = function(pageID, callback) {
    var options = { 
        method: 'GET',
        url: 'https://graph.facebook.com/v2.9/'+pageID+'/feed',
        qs: { fields: 'full_picture,picture', access_token: config.facebookGraphAPI.apiKey },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
};

exports.getReviews = function(pageID, callback) {
    var options = { 
        method: 'GET',
        url: 'https://graph.facebook.com/v2.9/'+pageID+'/ratings',
        qs: { access_token: config.facebookGraphAPI.apiKey },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
    });
};