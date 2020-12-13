
const { getDB } = require('./utils/utils');
const alertCtrl = require('./app/alert/alert.controller');
const agentCtrl = require('./app/agent/agent.controller');


//let instance = null;

class Database {

    constructor(){
        
        this.data = getDB();
        this.alerts  = getDB();
        this.agents = agentCtrl.getJSONAgents(); 

        console.log('database constructor', this);
    }

    /*
    static getInstance(){
        if(!instance){
            instance = new Database();
        }

        return instance;
    }
    */


}



module.exports = new Database();