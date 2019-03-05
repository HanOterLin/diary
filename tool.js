const crypto = require('crypto');
const fs = require('fs');
const path = require("path");

function encrypt(str, secret) {
    const cipher = crypto.createCipher('aes192', secret);
    let enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

function decrypt(str, secret) {
    const decipher = crypto.createDecipher('aes192', secret);
    let dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function run(currPath, key, isEn) {
    const fileNames = fs.readdirSync(currPath);
    fileNames.forEach((ele, index) => {
        if (ele !== '.git') {
            const fullPath = path.join(currPath, "/", ele);
            const info = fs.statSync(fullPath)
            if (info.isDirectory()) {
                run(fullPath);
            } else {
                let before = 'txt';
                let after = 'txtx';
                if (!isEn) {
                    [before, after] = [after, before];
                }
                const regex = new RegExp(`${before}$`);
                if (ele.endsWith(before)) {
                    const data = fs.readFileSync(fullPath);
                    const str = data.toString();
                    const en = isEn ? encrypt(str, key) : decrypt(str, key);
                    fs.writeFileSync(fullPath.replace(regex, after), en);
                }
            }
        }
    })
}

module.exports = {
    encrypt,
    decrypt,
    run,
};