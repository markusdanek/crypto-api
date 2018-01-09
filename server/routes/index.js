var app = require('express').Router();

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.status(200).json({
          message: 'Welcome to crypto-api'
        });
    });
};
