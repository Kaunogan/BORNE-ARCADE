/*
 * Nom : decrypt.js
 * Date : 13/01/2020
 * Auteur : GUMBAU Elric
 * License : MIT
 * Desc : Decrypt the token
 */

// Require
const fs = require("fs");

// Variables
var code = null;
var key = null;
var party = null;
var tokenUsed = [];
var same = false;
var tokenRemainig = "";

var alphabet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

// Function to decrypt token
function parse_token(tokenFinal) {
	$(".container").append(`
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
	var party = tokenFinal.substring(0, 1);
	var encMsg = tokenFinal.substring(1, tokenFinal.length);
	var letter = "";
	var random = 0;

	if (encMsg.length == 5) {
		letter = parseInt(encMsg.substring(0, 2)) / 2;
		random = encMsg.substring(2, 5);
	} else if (encMsg.length == 4) {
		letter = parseInt(encMsg.substring(0, 1)) / 2;
		random = encMsg.substring(1, 4);
	}

	readToken(function () {
		tokenUsed.forEach(function (element, index) {
			if (parseInt(element) == parseInt(tokenFinal)) {
				same = true;
			}
		});

		if (!same) {
			if (alphabet[letter] == undefined) {
				setTimeout(() => {
					$("#infos").html("Code invalide");
					setTimeout(() => {
						$(".loader").remove();
						$("#infos").remove();
						fill_keyboard_by_number();
						document.onkeydown = move_on_keyboard_number;
						tokenFinal = "";
						$("#token_input").val("");
						number = 0;
					}, 2000);
				}, 5000);
			} else {
				var decMsg = check_code(alphabet[letter], -1 * random);

				if (alphabet[letter] != decMsg) ok = false;

				if (decMsg == "O") {
					writeToken(tokenFinal.toString(), function () {
						readTokenRemaining(function () {
							tokenRemainig =
								parseInt(tokenRemainig) + parseInt(party);
							writeTokenRemaining(tokenRemainig, function () {
								setTimeout(function () {
									$("#infos").html("Code valide !");
									setTimeout(function () {
										window.close();
									}, 2000);
								}, 5000);
							});
						});
					});
				} else {
					setTimeout(() => {
						$("#infos").html("Code invalide");
						setTimeout(() => {
							$(".loader").remove();
							$("#infos").remove();
							fill_keyboard_by_number();
							document.onkeydown = move_on_keyboard_number;
							tokenFinal = "";
							$("#token_input").val("");
							number = 0;
						}, 2000);
					}, 5000);
				}
			}
		} else {
			same = false;
			setTimeout(() => {
				$("#infos").html("Code déjà utilisé !");
				setTimeout(() => {
					$(".loader").remove();
					$("#infos").remove();
					fill_keyboard_by_number();
					document.onkeydown = move_on_keyboard_number;
					tokenFinal = "";
					$("#token_input").val("");
					number = 0;
				}, 2000);
			}, 5000);
		}
	});
}

// Function to check the code
function check_code(msg, key) {
	var encMsg = "";

	for (var i = 0; i < msg.length; i++) {
		var code = msg.charCodeAt(i);

		// Encrypt only letters in 'A' ... 'Z' interval
		if (code >= 65 && code <= 65 + 26 - 1) {
			code -= 65;
			code = mod(code + key, 26);
			code += 65;
		}

		encMsg += String.fromCharCode(code);
	}

	return encMsg;
}

// Modulo function: n mod p
function mod(n, p) {
	if (n < 0) n = p - (Math.abs(n) % p);

	return n % p;
}

// Functions Files

function readToken(callback) {
	fs.readFile("conf/tokenUsed.conf", "utf-8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		tokenUsed = data.split(",");

		callback();
	});
}

function writeToken(token, callback) {
	fs.appendFile("conf/tokenUsed.conf", "," + token, function (err) {
		if (err) {
			return console.log(err);
		}
		callback();
	});
}

function readTokenRemaining(callback) {
	fs.readFile("conf/tokenRemaining.conf", "utf-8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		tokenRemainig = data;
		callback();
	});
}

function writeTokenRemaining(token, callback) {
	fs.writeFile("conf/tokenRemaining.conf", token, function (err) {
		if (err) {
			return console.log(err);
		}
		callback();
	});
}
