var express = require('express');
var router = express.Router();

var client_id = 'gFcZMD8oSVXpwjzDiOuF';
var client_secret = '5AnI3RgpSM';
var state = "RANDOM_STATE";
var redirectURI;

if (process.env.PORT)
    redirectURI = encodeURI("http://young-crag-65037.herokuapp.com/callback");
else
    redirectURI = encodeURI("http://127.0.0.1:3000/callback");

var api_url = "";
var request = require('request');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/chats/:name', function(req, res) {
    console.log(req.params.name);
    res.render('chats', {name:req.params});
})

/*
router.get('/', function(req, res) {    
    res.render('index');
    //api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    //res.render('login', {api_url: api_url});
});

router.get('/callback', function (req, res) {
    code = req.query.code;
    state = req.query.state;
    
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
    + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
       
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    var token;
    request.get(options, function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            token = JSON.parse(body).access_token;
            naverProfile(token, res);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

router.get('/login', function(req, res) {
   //res.sendFile(__dirname + '/index.html');
   res.render('chats');
});

var naverProfile = (token, res) => {
    //Profile 
    var header = "Bearer " + token;
    api_url = 'https://openapi.naver.com/v1/nid/me';
    var options = {
        url: api_url,
        headers: {'Authorization': header}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body).response.name);
            res.render('chats', {name : JSON.parse(body).response.name});
        } else {
            console.log('error');
            if(response != null) {
                console.log('error = ' + response.statusCode);
            }
        }
    })
}
*/

module.exports = router;