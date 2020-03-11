/*
* Name : server.js
*
* Version : 2.0.0
*
* Authors : GUMBAU Elric, LEMOINE Kaunogan
*/

//Imports
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); // Charge le module path


//Instantiate server
var server = express();

//Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Make static CSS, JS files, images etc ...
server.use('/assets', express.static('assets'));

//When the user arrives on Ynov's blog, we display the login page
server.get('/', function (req, res) {
    res.status(200);
    res.render('home-page/page_aceuille.ejs'); //login.ejs page is returned to the user
})
server.get('/payefdp', function (req, res) {
    res.status(200);
    res.render('home-page/page_chois_payement.ejs'); //login.ejs page is returned to the user
})
server.get('/hipay', function (req, res) {
    res.status(200);
    res.render('payement_page/payement_hipay.ejs'); //login.ejs page is returned to the user
})
/*************** POST ****************/

// When the user connects, we check if the information is correct and we assign a 1h token


//Launch server
server.listen(8080, function () {
    console.log('Server listen on port 8080')
});