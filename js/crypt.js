/*** CRYPT TOKEN ***/

// const
const d = new Date().getDate();
const month = new Date().getMonth();

// Variables

var msg = "";
var ok = true;
var random = 0;
var encMsg = null;
var array_token_used = [];
var party = 4;
var old_date = 0;
var old_month = 0;
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

// Check date and Leter

readInFileDate(
	"http://localhost/Perso/Ynov/Site_Paiement_Borne/conf/date.conf",
	function () {
		if (month > parseInt(old_month) || month < parseInt(old_month)) {
			console.warn("1");

			clearFileToken(
				"http://localhost/Perso/Ynov/Site_Paiement_Borne/php/clearToken.php"
			);

			writeInFileDate(
				month.toString() + "," + d.toString(),
				"http://localhost/Perso/Ynov/Site_Paiement_Borne/php/writeDate.php"
			);

			writeInFileLetter(
				alphabet[d - 1].toString(),
				"http://localhost/Perso/Ynov/Site_Paiement_Borne/php/writeLetter.php"
			);
		} else if (month == parseInt(old_month) && d > parseInt(old_date)) {
			console.warn("2");

			clearFileToken(
				"http://localhost/Perso/Ynov/Site_Paiement_Borne/php/clearToken.php"
			);

			writeInFileDate(
				month.toString() + "," + d.toString(),
				"http://localhost/Perso/Ynov/Site_Paiement_Borne/php/writeDate.php"
			);

			writeInFileLetter(
				alphabet[d - 1].toString(),
				"http://localhost/Perso/Ynov/Site_Paiement_Borne/php/writeLetter.php"
			);
		}

		readInFileLetter(
			"http://localhost/Perso/Ynov/Site_Paiement_Borne/conf/letter.conf"
		);
	}
);

// For the token

readInFileTokenUsed(
	"http://localhost/Perso/Ynov/Site_Paiement_Borne/conf/tokenUsed.conf",
	function () {
		random_number();
	}
);

// Functions

function encrypt(msg, key) {
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

// Random
function random_number() {
	random = Math.floor(Math.random() * (999 - 100 + 1)) + 100; // Random number
	encMsg = encrypt(msg, random); // Call crypt function

	var token = encMsg.toString() + random.toString(); // Token to write in file

	var exit = true;

	if (array_token_used.length != 0) {
		// Randomize number while not different from the file numbers
		while (exit) {
			array_token_used.forEach(function (element, index) {
				if (element === token) {
					console.warn("generate new token !");
					exit = true;
					random = Math.floor(Math.random() * (999 - 100 + 1)) + 100; // Random number
					encMsg = encrypt(msg, random); // Call crypt function
					token = encMsg.toString() + random.toString();
					return;
				} else {
					exit = false;
				}
			});
		}
	}

	writeInFileToken(
		token,
		"http://localhost/Perso/Ynov/Site_Paiement_Borne/php/writeToken.php"
	); // Call function to write token in file
}

// Display

function display_token() {
	var letter_crypted = encMsg;
	var number_crypted = 0;

	// Crypt the number
	alphabet.forEach(function (element, index) {
		if (element === letter_crypted) {
			number_crypted = index * 2;
		}
	});

	var decMsg = encrypt(alphabet[number_crypted / 2], -1 * random);

	if (msg != decMsg) ok = false;

	// Display the token generate
	$(".container").append(`
		${party.toString() + number_crypted.toString() + random.toString()}<br>
		${decMsg}
	`);
}

// File

function readInFileTokenUsed(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				array_token_used = allText.split(",");
				callback();
			}
		}
	};
	rawFile.send(null);
}

function readInFileDate(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				old_month = allText.split(",")[0];
				old_date = allText.split(",")[1];
				callback();
			}
		}
	};
	rawFile.send(null);
}

function readInFileLetter(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				msg = allText;
			}
		}
	};
	rawFile.send(null);
}

function writeInFileToken(token, url) {
	$.ajax({
		type: "POST", // Le type de la requête HTTP, ici devenu POST
		data: { token: token },
		url: url, //url of receiver file on server
		success: function () {
			display_token();
		},
	});
}

function writeInFileDate(date, url) {
	$.ajax({
		type: "POST", // Le type de la requête HTTP, ici devenu POST
		data: { date: date },
		url: url, //url of receiver file on server
		success: function () {
			console.log("write !");
		},
	});
}

function writeInFileLetter(letter, url) {
	$.ajax({
		type: "POST", // Le type de la requête HTTP, ici devenu POST
		data: { letter: letter },
		url: url, //url of receiver file on server
		success: function () {
			console.log("write !");
		},
	});
}

function clearFileToken(url) {
	$.ajax({
		type: "POST", // Le type de la requête HTTP, ici devenu POST
		url: url, //url of receiver file on server
	});
}

// For the arcade menu

//var decMsg = encrypt(encMsg, -1 * random);

//if (msg != decMsg) ok = false;
