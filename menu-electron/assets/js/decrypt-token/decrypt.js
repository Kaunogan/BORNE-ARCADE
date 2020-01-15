/*
 * Nom : decrypt.js
 * Date : 13/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Decrypt the token
*/

// Require
const fs = require('fs')

// Variables
var code                     = null;
var key                      = null;
var json_token_parsed        = null;
var date                     = null;
var party                    = null;
var codeDecrypted            = "";
var d                        = new Date();
var code_checked             = false;
var date_checked             = false;
var party_time               = null;
var array_token_already_used = [];
var token_already_used       = false;
var minutes_remaining		 = null;	
var secondes_remaining		 = null;	
var times_remaining		     = null;	

// Function to decrypt token
function parse_token(tokenFinal) {

	$('.container').append(`
		<div class="loader">
			<div class="pacman"></div>
			<div class="stomach"></div>
			<ul class="dots">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
		<h1 id="infos">Vérification du code</h1>
	`);

	// Parse token
	code = tokenFinal.substring(0, 1);
	key = tokenFinal.substring(1, 4);
	date = tokenFinal.substring(4, 6)
	party = tokenFinal.substring(6, 7)

	// Create a json of the token
	json_token_parsed = {
		token: tokenFinal,
		code: code,
		key: key,
		date: date,
		party: party,
	};

	// Section check token if valid
	// Check the code
	check_code(json_token_parsed.code, parseInt(json_token_parsed.key));

	// Chck the date
	check_date(json_token_parsed.date);

	if (code_checked === true && date_checked === true && parseInt(json_token_parsed.party) <= 4 && json_token_parsed.party != "0") {

		code_checked = false;
		date_checked = false;

		if (json_token_parsed.party === "1") {
			party_time = 05;
		}
		else if (json_token_parsed.party === "2") {
			party_time = 10;
		}
		else if (json_token_parsed.party === "3") {
			party_time = 15;
		}
		else if (json_token_parsed.party === "4") {
			party_time = 20;
		}

		//Read token already used
		readTokenAlreadyUsed(`../../tokenUsed.txt`);

		// Check if the token is already used
		for (var i = 0; i < array_token_already_used.length; i++) {

			if(array_token_already_used[i].substring(0, 6) == json_token_parsed.token.substring(0, 6)){
				token_already_used = true;
			}
		}
		
		if(!token_already_used === true){
			

			array_token_already_used.push(json_token_parsed.token);

			//Write the token
			writeToken(array_token_already_used);

			// Get time remaining
			readTime(`../../remaining.txt`);
			minutes_remaining =  parseInt(minutes_remaining) + party_time;
			times_remaining   = `${minutes_remaining.toString()}:${secondes_remaining}`

			// Write the time remaining
			writeTime(times_remaining);


			setTimeout(() => {
				$('#infos').html('Code valide')
				setTimeout(() => {
					window.close();
				}, 1700);
			}, 5000);

		} else {
			setTimeout(() => {
				$('#infos').html('Code déjà utilisé !');
				setTimeout(() => {
					$('.loader').remove();
					$('#infos').remove();
					init_keyboard();
					document.onkeydown = move_on_keyboard_letter;
					$('#token_input').val("");
					number = 0;

				}, 2000);
			}, 5000);
		}
	}
	else {

		setTimeout(() => {
			$('#infos').html('Code invalide');
			setTimeout(() => {
				$('.loader').remove();
				$('#infos').remove();
				init_keyboard();
				document.onkeydown = move_on_keyboard_letter;
				$('#token_input').val("");
				number = 0;

			}, 2000);
		}, 5000);
	}
}

function check_code(encryptedString, unshiftAmount) {

	for (var i = 0; i < encryptedString.length; i++) {
		var encryptedCharacter = encryptedString.charCodeAt(i);
		if (encryptedCharacter >= 97 && encryptedCharacter <= 122) {
			codeDecrypted += String.fromCharCode((encryptedCharacter - 97 - unshiftAmount + 26) % 26 + 97);
		} else if (encryptedCharacter >= 65 && encryptedCharacter <= 90) {
			codeDecrypted = String.fromCharCode((encryptedCharacter - 65 - unshiftAmount + 26) % 26 + 91);
		} else {
			codeDecrypted = String.fromCharCode(plainCharacter);
		}
	}

	if (codeDecrypted === "Y") {
		code_checked = true;
	}
	else {
		code_checked = false;
	}
}

function check_date(date_token) {

	if ((parseInt(date_token) / 3) === d.getDate()) {
		date_checked = true;
	} else {
		date_checked = false;
	}
}

function writeTime(party_time) {

	// Write the time in 'remaining.txt' . 
	fs.writeFile('remaining.txt', party_time, (err) => {

		// In case of a error throw err. 
		if (err) throw err;
	})
}

function writeToken(array_token_already_used) {

		// Write the time in 'remaining.txt' . 
		fs.writeFile('tokenUsed.txt', array_token_already_used, (err) => {

			// In case of a error throw err. 
			if (err) throw err;
		})
	
}

function readTokenAlreadyUsed(file)
{
    rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				var allText = rawFile.responseText;
				var tokenUsed = allText.split(',');
				for (var i = 0; i < tokenUsed.length; i++) {
					array_token_already_used.push(tokenUsed[i]);
				}
            }
        }
    }
    rawFile.send(null);
}

function readTime(file)
{
    rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				var times = rawFile.responseText.split(':');
				minutes_remaining  = times[0];
				secondes_remaining = times[1];
            }
        }
    }
    rawFile.send(null);
}