const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js')
const config = require('../configuration/config');

const encryption=()=>{}

// encryption by bcrypt

encryption.getencryptedPassword =async(password)=>{

    const encryptedPassword = await bcrypt.hash(password, config.get('server.security.salt'))
    
    return encryptedPassword;


}

//encryption and decryption cryptojs

encryption.getencrypted   =async(password)=>{

    const encryptedPassword = await CryptoJS.AES.encrypt(password, config.get('server.security.salt')).toString();
    return encryptedPassword;
}


encryption.getdecryptedPassword= async (encryptedPassword)=>{

    const decryptedPassword = await CryptoJS.AES.decrypt(encryptedPassword, config.get('server.security.salt'));
     const originalText = decryptedPassword.toString(CryptoJS.enc.Utf8);
     console.log(originalText)
     return originalText;
   
}


module.exports = encryption