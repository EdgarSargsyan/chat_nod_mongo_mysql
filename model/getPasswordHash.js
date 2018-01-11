const crypto = require('crypto');

function getHash(pass, salt){
   
    
    let hash = crypto.createHmac('sha256', pass)
                        .update(salt)
                        .digest('hex');
    return hash;
}


module.exports= getHash;