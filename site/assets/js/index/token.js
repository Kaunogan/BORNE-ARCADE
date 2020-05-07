
// Encrypt
var encrypted = CryptoJS.RC4Drop.encrypt("1243", "PPP", {
    drop: 3072 / 2
  }).toString();
 

console.log(encrypted);

// Decrypt
var decrypted = CryptoJS.RC4Drop.decrypt(encrypted, "oui", {
  drop: 3072 / 2
}).toString();


var hash = CryptoJS.MD5("Message");

console.log(hash.toString());