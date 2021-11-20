const fs = require('fs');

async function logToFile(logFilepath, data) {
    try {
        fs.appendFileSync(logFilepath,data);
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}

module.exports.logToFile = logToFile;