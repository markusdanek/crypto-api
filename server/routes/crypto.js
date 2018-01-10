var controllers = require('../controllers'),
    app = require('express').Router();

module.exports = function(app) {
    app.get('/current', controllers.crypto.getCurrentPrice);
    app.get('/amount', controllers.crypto.ethCoinsInUSD);
    app.get('/pct', controllers.crypto.changePtc24Hour);
    app.get('/month', controllers.crypto.getPricesLast7Days);
    // app.get('/api/:id', controllers.jobs.getId);
};
