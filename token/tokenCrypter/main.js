/*
 * Name : main.js
 *
 * Desc : The main of the app
 * 
 * Author : GUMBAU Elric
 */

var bodyParser = require('body-parser');
var path = require('path'); // Charge le module path
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // Permet de parser l'url pour récuperer les informations de connexion
var express = require('express');
var TokenCrypter = require('./assets/js/class/tokenCrypter');

//Instantiate app
var app = express();

//Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Make static CSS, JS files, images etc ...
app.use(express.static(path.join(__dirname, "assets")));

//Variables
var arrayTokenUsed = [];


/************ POST ************/
app.post('/generatetoken', urlencodedParser , (req, res) => {

    //Instantiate class Api
    const token = new TokenCrypter();

    // Get selected party
    const party = req.body.party; //We get the party selectd by the user

    // Generate token
    token.generateToken(party, arrayTokenUsed, res);

    console.log(arrayTokenUsed);
});

/************ GET ************/

app.get('/make-a-donation', function (req, res) {
    res.status(200);
    res.render('makeADonation.ejs'); //login.ejs page is returned to the user
})

app.get('/your-token', function (req, res) {
    res.status(200);

    if (req.query.token == "") {
        //code.ejs page is returned to the user
        res.render('token.ejs', {
            token: "Désoler une erreur est survenue",
        });
    } else {
        //code.ejs page is returned to the user
    res.render('token.ejs',{ 
        token: req.query.token,
      }); 
    }
})

app.listen(8080, function () {
    console.log('app listening on port 8080 !');
});