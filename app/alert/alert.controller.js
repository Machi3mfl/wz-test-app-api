const { getDB } = require('../../utils/utils');


/**
 * Get alerts from json
 */
function getJSONAlerts(){
    let alerts = getDB();
    
    return alerts;
}

/**
 * 
 * Get all alerts data, can be filtered by limit and offset
 * 
 * @param {*} params 
 */


function getAll({ limit, offset }){
    // get data from json
    const alerts = this.getJSONAlerts(); 

    // calculate init index and last index of array by offset and/or limit
    let initPos = 0;
    let qty = alerts.length;
    
    if(limit > 0){
        qty = parseInt(limit);
    }

    if(offset > 0){
        initPos = parseInt(offset);
    }
    
    // slice array
    let data = alerts.slice(initPos, initPos + qty);
    ////////////////////////////////////////////////////////////////

    return {
        total_items: alerts.length,
        data: data
    }

    
}

/**
 * 
 * Get alert by id
 * 
 * @param {*} ids 
 */
function getById(ids){
     // get data from json
     const alerts = getDB();

     // if ids is not a array return all alerts
     if(!Array.isArray(ids)){
        return {
            total_items: alerts.length,
            data: alerts
        }
     }

    // if ids array exist
    // get elements by ids 
    let list = [];
    // order ids
    ids = ids.sort();
    for(let i = 0; i < ids.length; i++){
        
        // id = 0 doesnt exist
        if(parseInt(ids[i]) === 0){
            continue;
        }

        // index array - 1
        let index = parseInt(ids[i]) - 1;
        // if index exist
        if(alerts[index]){
            // push to array
            list.push(alerts[index]);
        }

    }

    return {
        total_items: alerts.length,
        data: list
    }
    
}


module.exports = {
    getJSONAlerts,
    getAll,
    getById
}