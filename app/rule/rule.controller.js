const { getDB } = require('../../utils/utils');

/**
 * Get rules from json
 */
function getJSONRules(){
    return getParsedRules();
}


/**
 * Parsed rules
 */
function getParsedRules(){
    // get data from db
    let data = getDB();
    // list array
    let list = [];
    // id list array
    let idList = [];
    // property
    let propertyName = 'rule';

    for(let i = 0; i < data.length; i++){
        let item = data[i]['_source'][propertyName];
        let id = item['id'];

        // position of agent id in list
        let index = idList.indexOf(id);

        // if id not exist in list
        if(index === -1){

            idList.push(id);
            list.push({
                ...item,
                total_alerts: 1,
                alerts: [data[i]]
            });

        }else{ // if id exist in list
            // count list total data
            list[index].total_alerts = list[index].total_alerts + 1;

            // data[i]['_source'] = delete data[i]['_source'][propertyName];
            
            list[index].alerts.push(data[i]);

        }

    }

    // separate in utils file
    // order array by agent id
    list = list.sort((item1,item2) => {

        let comparison = 0;
        let a = item1.id;
        let b = item2.id;

        if (a > b) {
            comparison = 1;
        } else if (a < b) {
            comparison = -1;
        }
        return comparison;
    })

    return list;

}



/**
 * Get all rules, can be filtered by limit and offset
 * @param {*} param0 
 */

function getAll({limit, offset}){
    let list = getJSONRules();

    // calculate init index and last index of array by offset and/or limit
    let initPos = 0;
    let qty = list.length;
   
    if(limit > 0){
        qty = parseInt(limit);
    }

    if(offset > 0){
        initPos = parseInt(offset);
    }
    
    // slice array
    let data = list.slice(initPos, initPos + qty);
    ////////////////////////////////////////////////////////////////
    // remove alerts
    data.forEach((item) =>  delete item.alerts);

    return {
        total_items: list.length,
        data: data
    }

}

/**
 * Get rule by id
 * @param {*} id 
 */
function getById(id){
    let list = getJSONRules();

    let rule = list.filter( item => item.id === id)[0];

    if(rule){

        return {
            data: rule
        }

    }

    return null;
}

module.exports = {
    getJSONRules,
    getAll,
    getById
}
