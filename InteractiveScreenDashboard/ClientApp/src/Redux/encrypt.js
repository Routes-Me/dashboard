import CryptoJS from 'crypto-js';
// Code goes here
var keySize = 256;
var ivSize = 128;
var iterations = 100;


//variables for Encryption
const key = '82f2ceed4c503896c8a291e560bd4325'; // change to your key
const iv = 'sinasinasisinaaa'; // change to your iv
const apiKey = '123xxxyyyzzz'; // change to your api key




export function encryptAES(text) {
    var key = CryptoJS.enc.Utf8.parse('2020ROUTESME2020');
    var iv = CryptoJS.enc.Utf8.parse('2020ROUTESME2020');  
    var encryptedpassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }); 
    return encryptedpassword;
}

export function encrypt(msg, pass) {
   
    var salt = CryptoJS.lib.WordArray.random(128 / 8);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    });

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    var transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
}

function decrypt(transitmessage, pass) {
    var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
    var encrypted = transitmessage.substring(64);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    });
    return decrypted;
}