global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const timeHelper = require("../helper/time.js");
const ccHelper = require("../helper/cryptocompare.js");

module.exports = {
    // GET /current
    getCurrentPrice: function(req, res, next) {
      const crypto = 'ETH';
      // const crypto = req.param('crypto');
      const price = ccHelper.getCurrentPrice(crypto);
      price.then(function(result) {
        res.json(result);
      })
    },

    // GET /portfolio
    coinsInUSD: function(req, res, next) {
      const coins = 0.4519;
      const crypto = ['ETH', 'BTC'];
      // const coins = req.param('coins');
      // const crypto = req.param('crypto');
      const price = ccHelper.coinsInUSD(crypto, coins);
      price.then(function(result){
        console.log(result);
      })
    },

    // GET /daily
    changePtc24Hour: function(req, res, next) {
      const crypto = 'ETH';
      // const crypto = req.param('crypto');
      const price = ccHelper.changePtc24Hour(crypto, 'USD');
      price.then(function(result){
        res.json(result);
      })
    },

    // GET /monthly
    getPricesLast7Days: function(req, res, next) {
      const lastWeek = timeHelper.last7Days();
      const coin = 'ETH';
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      (async function loop() {
        for (const i = 0; i < lastWeek.length; i++) {
          await delay(Math.random() * 100);
          var prices = ccHelper.getPricesLast7Days(lastWeek[i], coin);
          prices.then(function(result){
            console.log(result);
          })
        }
      })();
    }
};
