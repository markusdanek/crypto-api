var controllers = require('../controllers'),
    app = require('express').Router();

module.exports = function(app) {
    app.get('/current', controllers.crypto.getCurrentPrice);
    app.get('/portfolio', controllers.crypto.coinsInUSD);
    app.get('/daily', controllers.crypto.changePtc24Hour);
    app.get('/monthly', controllers.crypto.getPricesLast7Days);
    // app.get('/api/:id', controllers.jobs.getId);
};
