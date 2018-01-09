const timeHelper = require("../helper/time.js");
const ccHelper = require("../helper/cryptocompare.js");

module.exports = {
    getCurrentPrice: function(req, res, next) {
      ccHelper.getPrice('ETH', function(price){
        res.status(200).json(price);
      });
      res.status(200).json('price');
    },

    ethInUSD: function(req, res, next) {
        var id = req.params.id;
        ccHelper.ethInUSD(0.4519);
    },

    changePtc24Hour: function(req, res, next) {
      ccHelper.changePtc24Hour('ETH', 'USD');
    }
};
