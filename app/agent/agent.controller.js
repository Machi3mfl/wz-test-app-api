const { getDB } = require('../../utils/utils');

/**
 * Get alerts with Json Format
 */
function getJSONAgents(){
    return getParsedAgents();
}




/**
 * Parsed JSON Agert with api response format
 */
function getParsedAgents(){
    // get alerts from db
    let alerts = getDB();
    // agents array
    let agents = [];
    // id agents array
    let idList = [];

    for(let i = 0; i < alerts.length; i++){
        let agent = alerts[i]['_source']['agent'];
        let agentId = agent['id'];

        // position of agent id in list
        let index = idList.indexOf(agentId);

        // if id not exist in list
        if(index === -1){

            idList.push(agentId);
            agents.push({
                ...agent,
                total_alerts: 1,
                alerts: [alerts[i]]
            });

        }else{ // if id exist in list
            // count agents total alerts
            agents[index].total_alerts = agents[index].total_alerts + 1;
            agents[index].alerts.push(alerts[i]);

        }

    }

    // separate in utils file
    // order array by agent id
    agents = agents.sort((item1,item2) => {

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

    return agents;

}



/**
 *  
 * Get all agents data, can filter with limit and/or offset 
 *
 * @param {*} limit
 * @param {*} offset
 */
function getAll({ limit, offset }){
    let agents = getParsedAgents();


     // calculate init index and last index of array by offset and/or limit
     let initPos = 0;
     let qty = agents.length;
    
     if(limit > 0){
         qty = parseInt(limit);
     }
 
     if(offset > 0){
         initPos = parseInt(offset);
     }
     
     // slice array
     let data = agents.slice(initPos, initPos + qty);
     ////////////////////////////////////////////////////////////////



    // remove alerts
    data.forEach((item) =>  delete item.alerts);

    return {
        total_items: agents.length,
        data
    }

}

/**
 * 
 * Get agent data by id
 * 
 * @param {*} id 
 */
function getById(id){
    let agents = getParsedAgents();

    let agent = agents.filter( item => item.id === id)[0];

    if(agent){

        return {
            data: agent
        }

    }

    return null;
}

module.exports = {
    getJSONAgents,
    getAll,
    getById
}
