var express = require('express');
var router = express.Router();

var client_id = 'gFcZMD8oSVXpwjzDiOuF';
var client_secret = '5AnI3RgpSM';
var state = "RANDOM_STATE";
var redirectURI = encodeURI("http://127.0.0.1:3000/callback");
var api_url = "";

router.get('/', function(req, res) {
    //res.sendFile(__dirname + '/index.html');
    //res.render('login');
    
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/big_g.PNG'/></a>");

});

router.get('/callback', function (req, res) {
    code = req.query.code;
    state = req.query.state;
    
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
    + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    
    request.get(options, function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            console.log(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

module.exports = router;