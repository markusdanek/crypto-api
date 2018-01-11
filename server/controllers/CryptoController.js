global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const timeHelper = require("../helper/time.js");
const ccHelper = require("../helper/cryptocompare.js");
const flatten = require('array-flatten');

module.exports = {
    // GET /price
    // Returns the current price of 1 token
    price: function(req, res, next) {
      const crypto = 'ETH';
      const cryptoParam = req.param('crypto');
      const price = ccHelper.getCurrentPrice(crypto);
      price.then(function(result) {
        res.json(result);
      })
    },

    // GET /portfolio
    // Return the value of holding tokens in Dollar
    coinInUSD: function(req, res, next) {
      const coins = 0.4519;
      const crypto = 'ETH';
      const coinsParam = req.param('coins');
      const cryptoParam = req.param('crypto');
      const price = ccHelper.coinInUSD(crypto, coins);
      price.then(function(result){
        res.json(result);
      });
    },

    // GET /sum
    portfolio: function(req, res, next) {
      const ethCoins = 0.5250;
      const ltcCoins = 0.1758;
      const xrpCoins = 24.97500000;
      const xrbCoins = 2.08100192;
      const btcCoins = 0.00781685;
      let ethSum, btcSum, ltcSum, xrpSum, xrbSum, cryptoSum;

      let ethValue = ccHelper.coinInUSD('ETH', ethCoins);
      let ltcValue = ccHelper.coinInUSD('LTC', ltcCoins);
      let xrpValue = ccHelper.coinInUSD('XRP', xrpCoins);
      let xrbValue = ccHelper.coinInUSD('XRB', xrbCoins);
      let btcValue = ccHelper.coinInUSD('BTC', btcCoins);

      ethValue.then(result => {
        ethSum = result;
        ltcValue.then(result => {
          ltcSum = result;
          xrpValue.then(result => {
            xrpSum = result;
            xrbValue.then(result => {
              xrbSum = result;
              btcValue.then(result => {
                btcSum = result;
                let coinSum = ethSum + ltcSum + xrpSum + xrbSum + btcSum;
                res.json(coinSum);
              })
            })
          })
        })
      })

    },

    // GET /daily
    // Return value change of crypto coin in last 24 hours
    changeLast24HourPCT: function(req, res, next) {
      const crypto = 'ETH';
      const cryptoParam = req.param('crypto');
      const price = ccHelper.changeLast24HourPCT(crypto);
      price.then(function(result){
        res.json(result);
      })
    },

    // GET /monthly
    // Return prices of crypto coin of last 7 days
    getPricesLast7Days: function(req, res, next) {
      const crypto = 'ETH';
      const cryptoParam = req.param('crypto');
      let lastWeek = timeHelper.last7Days();
      let finalArray = [];
      let delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      (async function loop() {
        for (let i = 0; i < lastWeek.length; i++) {
          await delay(Math.random() * 100);
          let prices = ccHelper.getPricesLast7Days(lastWeek[i], crypto);
          prices.then(function(prices){
            finalArray.push(prices);
          })
        }
        await delay(Math.random() * 1000);
        res.json(flatten(finalArray))
      })();
    }
};
