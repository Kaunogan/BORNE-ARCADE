/*
 * Name : tokenCrypter.js
 *
 * Desc : Generate and crypte the token
 * 
 * Author : GUMBAU Elric
 */


// Class 'TokenCrypter'
class TokenCrypter {

  constructor() {
    //Variables
    this.date = new Date();
    this.sDate;
    this.random;
    this.key;
    this.used = false;
    this.isFinished = false;
    this._token;
  }

  // Function 'generateToken()'
  generateToken(party, arrayTokenUsed, res) {

    this.date = this.date.getDate() * 3;

    while (this.isFinished != true) {

      // Get random value
      this.random = Math.floor(1 + Math.random() * 999);
      this.key = this.random.toString();

      // Mutiply date
      this.sDate = this.date.toString();

      // Check the lenght of the key
      if (this.key.length == 1) {
        this.key = "00" + this.key;
      } else if (this.key.length == 2) {
        this.key = "0" + this.key;
      }

      // Check the lenght of the sDate
      if (this.sDate.length == 1) {
        this.sDate = "0" + this.sDate;
      }

      // Instanciate the token
      var token = this.crypte("Y", parseInt(this.key)) + this.key + this.sDate + party;

      // Check if token is already used
      for (let j = 0; j < arrayTokenUsed.length; j++) {
        if (arrayTokenUsed[j] == token) {
          console.log("Token " + arrayTokenUsed[j] + " already used at index " + arrayTokenUsed.indexOf(arrayTokenUsed[j]) + " !");
          this.used = true;
        }
      }

      if (this.used != true) {
        arrayTokenUsed.push(token);
        this._token = token;
        this.isFinished = true;
        this.used = false;
        res.redirect('/your-token/?token='+token);
      } else {
        this.used = false;
      }
    }
  }

  // Function 'crypte()'
  crypte(str, amount) {
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
  }

  // Function 'getToken()'
  get getToken(){
    return this._token;
  }
}

module.exports = TokenCrypter;