/*
 * Name : tokenCrypter.js
 *
 * Desc : Generate and crypte the token
 * 
 * Author : GUMBAU Elric
 */

//Variables
var date = new Date();
var sDate;
var party = "5";
var random;
var key;
var arrayTokenUsed = [];
var used = false;
var isFinished = false;

// Call function 'generateToken()'
generateToken();

console.log(arrayTokenUsed);

// Function 'generateToken()'
function generateToken() {

  date = date.getDate() * 3;

  while (isFinished != true) {

    // Get random value
    random = Math.floor(1 + Math.random() * 999);
    key = random.toString();

    // Mutiply date
    sDate = date.toString();

    // Check the lenght of the key
    if (key.length == 1) {
      key = "00" + key;
    } else if (key.length == 2) {
      key = "0" + key;
    }

    // Check the lenght of the sDate
    if (sDate.length == 1) {
      sDate = "0" + sDate;
    }

    // Instanciate the token
    var token = crypte("Y", parseInt(key)) + key + sDate + party;

    // Check if token is already used
    for (let j = 0; j < arrayTokenUsed.length; j++) {
      if (arrayTokenUsed[j] == token) {
        console.log("Token " + arrayTokenUsed[j] + " already used at index " + arrayTokenUsed.indexOf(arrayTokenUsed[j]) + " !");
        used = true;
      }
    }

    if (used != true) {
      arrayTokenUsed.push(token);
      console.log("Token " + token + " inserted at index " + arrayTokenUsed.indexOf(token) + " !");
      isFinished = true;
      used = false;
    } else {
      used = false;
    }
  }
}

// Function 'crypte()'
function crypte(str, amount) {

  if (amount < 0)
    return crypte(str, amount + 26);

  // Variable to store the result
  var res = '';

  //Browse each character
  for (var i = 0; i < str.length; i++) {
    // Recover the character we are going to add
    var c = str[i];
    // Check if it's a letter
    if (c.match(/[a-z]/i)) {
      // Get code
      var code = str.charCodeAt(i);
      // Capital letters
      (code >= 65) && (code <= 90)
      c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
    }
    // Add the character
    res += c;
  }
  // Result
  return res;
};