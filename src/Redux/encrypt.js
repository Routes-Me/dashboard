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
    var key = CryptoJS.enc.Utf8.parse('Qz-N!p#ATb9_2MkL');
    var iv = CryptoJS.enc.Utf8.parse('ledV\\K\"zRaNF]WXki,RMtLLZ{Cyr_1');  
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



export function encryptAndEncode(raw, IV, PASSWORD)
{
    //generate the position string
    var positionStr = randomStringOfLength(2,false);

    //calculate the index 
    var positionIndex = calculateIndexForWord(positionStr);

    //generate Full SALT of 16Char
    var salt = randomStringOfLength(16,true);

    //generate the exclude char
    var excludeText = randomStringOfLength(3,true);

    //filter the SALT with the above exclude text
    var refinedSalt = refineSalt(salt,excludeText);

    var encryptedText = encryptAES(refinedSalt);

    var prefixText = positionStr + excludeText

    return formatCipher(prefixText,encryptedText,salt,positionIndex);

}


function randomStringOfLength(length,mixed) 
{
    var result           = '';
    var alphabets        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var numbers          = '0123456789';
    var characters       = '';

    {mixed? characters = alphabets + numbers : characters = alphabets}


    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 function calculateIndexForWord(word)
 {
    var position = 0;
    var wordCount = word.length;
    for(var i=0; i<wordCount; i++)
    {
        position = word.charAt(i);
    }
    return position % 3;
 }

 function refineSalt(salt,excludeText)
 {
    for(var i=0; i<excludeText.length; i++){
        salt.replace(excludeText.charAt(i))
    }
    return salt;
 }

 function formatCipher(prefix,cipher,salt,indexPosition){

    var saltPart1 = salt.substring(0,10);
    var saltPart2 = salt.substring(10);
    var cipherPart1 ='', cipherPart2='';
    if(indexPosition>0)
    {
        cipherPart1 = cipher.substring(0,indexPosition);
        cipherPart2 = cipher.substring(indexPosition);
        return prefix + cipherPart1 + saltPart1 + cipherPart2 + saltPart2;
    }
    return prefix + saltPart1 + cipher + saltPart2;

 }
