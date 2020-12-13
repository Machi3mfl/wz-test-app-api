const fs = require('fs');
/**
 * 
 */
function getDB(){
    let rawdata = fs.readFileSync('alerts.json');
    let alerts = JSON.parse(rawdata);

    // add id property with array index
    alerts.forEach( (item, index) => {
        item.id = (index + 1).toString();
    });

    return alerts;
}

module.exports = {
    getDB
}