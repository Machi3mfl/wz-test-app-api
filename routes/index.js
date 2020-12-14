var alerts = require('./alerts');
var agents = require('./agents');
var rules = require('./rules');

// root path
const baseRoute = [
    { method: 'GET', path: '/', handler: (req, h) => {
            return h.response({ success: true, message: 'OK' });
        } 
    }
]

module.exports = [].concat(baseRoute, alerts, agents, rules);