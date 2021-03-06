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
      const currencyParam = req.param('currency');
      const price = ccHelper.getCurrentPrice(cryptoParam, currencyParam);
      price.then(function(result) {
        res.json(result);
      })
    },

    // GET /value
    // Return the value of holding tokens in Dollar
    coinInUSD: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      const coinsParam = req.param('coins');
      const currencyParam = req.param('currency');
      const price = ccHelper.coinInUSD(cryptoParam, coinsParam, currencyParam);
      price.then(function(result){
        res.json(result);
      });
    },

    // GET /portfolio
    // Return the worth of all crypto coins in USD
    portfolio: function(req, res, next) {
      const currencyParam = 'USD';
      const ethCoins = 0.5250;
      const ltcCoins = 0.1758;
      const xrpCoins = 24.97500000;
      const xrbCoins = 2.08100192;
      const btcCoins = 0.00781685;

      let ethValue = ccHelper.coinInUSD('ETH', ethCoins, currencyParam);
      let ltcValue = ccHelper.coinInUSD('LTC', ltcCoins, currencyParam);
      let xrpValue = ccHelper.coinInUSD('XRP', xrpCoins, currencyParam);
      let xrbValue = ccHelper.coinInUSD('XRB', xrbCoins, currencyParam);
      let btcValue = ccHelper.coinInUSD('BTC', btcCoins, currencyParam);

      Promise.all([ethValue, ltcValue, xrpValue, xrbValue, btcValue]).then(values => {
        let coinSum = values.reduce((a, v) => (a+v), 0);
        res.json(coinSum);
      }).catch(e => console.error(e));
    },

    // GET /daily
    // Return value change of crypto coin in last 24 hours
    changeLast24HourPCT: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      const currencyParam = req.param('currency');
      const price = ccHelper.changeLast24HourPCT(cryptoParam, currencyParam);
      price.then(function(result){
        res.json(result);
      })
    },

    // GET /monthly
    // Return prices of crypto coin of last 7 days
    getPricesLast7Days: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      const currencyParam = req.param('currency');
      let lastWeek = timeHelper.last7Days();
      let finalArray = [];
      let delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      (async function loop() {
        for (let i = 0; i < lastWeek.length; i++) {
          await delay(Math.random() * 100);
          let prices = ccHelper.getPricesLast7Days(lastWeek[i], cryptoParam, currencyParam);
          prices.then(function(prices){
            finalArray.push(prices);
          })
        }
        await delay(Math.random() * 1000);
        res.json(flatten(finalArray))
      })();
    },

    // GET /historicprice
    // Return price for specific timestamp
    getPricesForTimestamp: function(req, res, next) {
      const cryptoParam = req.param('crypto');
      const dayParam = req.param('day');
      const currencyParam = req.param('currency');
      const timestamp = new Date(dayParam);
      const price = ccHelper.getPricesForTimestamp(cryptoParam, timestamp, currencyParam);
      price.then(function(result){
        res.json(result);
      })
    }
};
