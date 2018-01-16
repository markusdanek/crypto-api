global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const timeHelper = require("../helper/time.js");
const ccHelper = require("../helper/cryptocompare.js");
const flatten = require('array-flatten');

module.exports = {
    // GET /price
    // Returns the current price of 1 token
    price: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      const price = ccHelper.getCurrentPrice(cryptoParam);
      price.then(function(result) {
        res.json(result);
      })
    },

    // GET /value
    // Return the value of holding tokens in Dollar
    coinInUSD: function(req, res, next) {
      const coinsParam = req.param('coins');
      const cryptoParam = req.param('crypto');
      const price = ccHelper.coinInUSD(cryptoParam, coinsParam);
      price.then(function(result){
        res.json(result);
      });
    },

    // GET /portfolio
    // Return the worth of all crypto coins in USD
    portfolio: function(req, res, next) {
      const ethCoins = 0.5250;
      const ltcCoins = 0.1758;
      const xrpCoins = 24.97500000;
      const xrbCoins = 2.08100192;
      const btcCoins = 0.00781685;

      let ethValue = ccHelper.coinInUSD('ETH', ethCoins);
      let ltcValue = ccHelper.coinInUSD('LTC', ltcCoins);
      let xrpValue = ccHelper.coinInUSD('XRP', xrpCoins);
      let xrbValue = ccHelper.coinInUSD('XRB', xrbCoins);
      let btcValue = ccHelper.coinInUSD('BTC', btcCoins);

      Promise.all([ethValue, ltcValue, xrpValue, xrbValue, btcValue]).then(values => {
        let coinSum = values.reduce((a, v) => (a+v), 0);
        res.json(coinSum);
      }).catch(e => console.error(e));
    },

    // GET /daily
    // Return value change of crypto coin in last 24 hours
    changeLast24HourPCT: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      const price = ccHelper.changeLast24HourPCT(cryptoParam);
      price.then(function(result){
        res.json(result);
      })
    },

    // GET /monthly
    // Return prices of crypto coin of last 7 days
    getPricesLast7Days: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      let lastWeek = timeHelper.last7Days();
      let finalArray = [];
      let delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      (async function loop() {
        for (let i = 0; i < lastWeek.length; i++) {
          await delay(Math.random() * 100);
          let prices = ccHelper.getPricesLast7Days(lastWeek[i], cryptoParam);
          prices.then(function(prices){
            finalArray.push(prices);
          })
        }
        await delay(Math.random() * 1000);
        res.json(flatten(finalArray))
      })();
    },

    getPricesForTimestamp: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      const dayParam = req.param('day');
      console.log(dayParam);
      const timestamp = Date.parse(dayParam);
      console.log(timestamp);
      const price = ccHelper.getPricesForTimestamp(cryptoParam, dayParam);
      price.then(function(result){
        res.json(result);
      })
    }
};
