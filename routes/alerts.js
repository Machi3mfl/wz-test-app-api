


const controller = require('../app/alert/alert.controller');
/* Params
    {
        offset: number // First element to return in the
        collection
        limit: number // Maximum number of elements to return id: number[] // List of alerts IDs
    }
*/

/* Response
    {
        total_items: number data: alert[]
    }
*/

/**
 * 
 * Get Alerts
 * 
 * @param {*} req 
 * @param {*} h 
 */

function get(req, h){
    // params
    const { ids, limit, offset } = req.query;

    try {
         // get alerts by ids
        if(ids){
            return controller.getById(ids.split(','));
        }

        // get alerts by limit or offset
        return controller.getAll({ limit, offset });
        
    }catch(err){
        console.log('error',err);
    }
   
}

module.exports = [
    { method: 'GET', path: '/alerts', handler: get }
]