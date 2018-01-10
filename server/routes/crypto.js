var controllers = require('../controllers'),
    app = require('express').Router();

module.exports = function(app) {
    app.get('/current', controllers.crypto.getCurrentPrice);
    app.get('/amount', controllers.crypto.ethInUSD);
    app.get('/pct', controllers.crypto.changePtc24Hour);
    app.get('/month', controllers.crypto.getPricesTimespan);
    // app.get('/api/:id', controllers.jobs.getJob);
};
