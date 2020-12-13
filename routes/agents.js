const controller = require('../app/agent/agent.controller');

/**
 * 
 * @param {*} req 
 * @param {*} h 
 */

function get(req, h){
    // params
    const { limit, offset } = req.query;

    try{    
        // get alerts by limit or offset
        let res =  controller.getAll({ limit, offset });
        return h.response(res).code(200);
       
    }catch(err){
        console.error('error', err);
        h.response().code(500);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} h 
 */
function getById(req, h){
    // params
    const { id } = req.params;

    try{
        // get alerts by ids
        if(id){

            let res = controller.getById(id);

            return res ?
                h.response(res).code(200) : 
                h.response({ data: null }).code(200)
        }

    }catch(err){
        console.error('error', err);
        h.response().code(500);
    }
    
}

module.exports = [
    { method: 'GET', path: '/agents', handler: get },
    { method: 'GET', path: '/agents/{id}', handler: getById },
]