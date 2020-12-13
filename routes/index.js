var alerts = require('./alerts');
var agents = require('./agents');
var rules = require('./rules');

module.exports = [].concat(alerts, agents, rules);