global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const timeHelper = require("../helper/time.js");
const ccHelper = require("../helper/cryptocompare.js");

module.exports = {
    // GET /current
    getCurrentPrice: function(req, res, next) {
      var price = ccHelper.getCurrentPrice('ETH');
      price.then(function(result) {
        res.json(result);
      })
    },

    // GET /amount
    ethCoinsInUSD: function(req, res, next) {
      // var id = req.params.id;
      var price = ccHelper.ethCoinsInUSD(0.4519);
      price.then(function(result){
        res.json(result);
      })
    },

    // GET /pct
    changePtc24Hour: function(req, res, next) {
      var price = ccHelper.changePtc24Hour('ETH', 'USD');
      price.then(function(result){
        res.json(result);
      })
    },

    // GET /month
    getPricesLast7Days: function(req, res, next) {
      const lastWeek = timeHelper.last7Days();
      const coin = 'ETH';
      let obj = {};
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      (async function loop() {
        for (var i = 0; i < lastWeek.length; i++) {
          await delay(Math.random() * 100);
          var prices = ccHelper.getPricesLast7Days(lastWeek[i], 'ETH');
          prices.then(function(result){
            console.log(result);
          })
        }
      })();
    }
};
