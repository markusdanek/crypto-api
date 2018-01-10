global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const timeHelper = require("../helper/time.js");
const ccHelper = require("../helper/cryptocompare.js");

module.exports = {
    // GET /current
    getCurrentPrice: function(req, res, next) {
      ccHelper.getCurrentPrice('ETH');

      // works
      cc.price('ETH', 'USD')
        .then(prices => {
          res.json(prices)
        }).catch(err=>{
          console.error(err)
          return next(err);
      })

      // ccHelper.getCurrentPrice('ETH', function(){
      //   res.json(prices);
      // });

      // const prices = ccHelper.getCurrentPrice('ETH');
      // console.log(prices);
      // res.json(prices);
    },

    // GET /amount
    ethCoinsInUSD: function(req, res, next) {
      // var id = req.params.id;
      // let amount = req.params.amount;
      ccHelper.ethCoinsInUSD(0.4519);

      // let amount = 0.4519;
      // cc.price('ETH', 'USD')
      //   .then(prices => {
      //     let ethCoin = [];
      //     Object.keys(prices).forEach((key) => {
      //       ethCoin.push(prices[key]);
      //     });
      //     let currentValue = amount * ethCoin;
      //     console.log(currentValue);
      //     res.json(currentValue);
      //   }).catch(err=>{
      //     console.error(err)
      //     return next(err);
      // })
    },

    // GET /pct
    changePtc24Hour: function(req, res, next) {
      ccHelper.changePtc24Hour('ETH', 'USD');

      // let coin = 'ETH';
      // let currency = 'USD';
      // cc.priceFull(coin, currency)
      // .then(prices => {
      //   console.log(prices[coin][currency]["CHANGEPCT24HOUR"]);
      //   res.json(prices[coin][currency]["CHANGEPCT24HOUR"]);
      // }).catch(err=>{
      //   console.error(err)
      //   return next(err);
      // })
    },

    // GET /month
    getPricesLast7Days: function(req, res, next) {
      const lastWeek = timeHelper.last7Days();

      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      (async function loop() {
          for (var i = 0; i < lastWeek.length; i++) {
              await delay(Math.random() * 100);
              ccHelper.getPricesLast7Days(lastWeek[i], 'ETH');
          }
      })();
    }
};
