var controllers = require('../controllers'),
    app = require('express').Router();

module.exports = function(app) {
    app.get('/price', controllers.crypto.price);
    app.get('/value', controllers.crypto.coinInUSD);
    app.get('/portfolio', controllers.crypto.portfolio);
    app.get('/daily', controllers.crypto.changeLast24HourPCT);
    app.get('/monthly', controllers.crypto.getPricesLast7Days);
    app.get('/historicprice', controllers.crypto.getPricesForTimestamp);
};
