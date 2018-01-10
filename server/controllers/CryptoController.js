global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const timeHelper = require("../helper/time.js");
const ccHelper = require("../helper/cryptocompare.js");

module.exports = {
    // GET /current
    getCurrentPrice: function(req, res, next) {
      cc.price('ETH', 'USD')
        .then(prices => {
          res.json(prices)
        }).catch(err=>{
          console.error(err)
          return next(err);
      })
    },

    // GET /amount
    ethInUSD: function(req, res, next) {
      // var id = req.params.id;
      // let amount = req.params.amount;
      let amount = 0.4519;

      cc.price('ETH', 'USD')
        .then(prices => {
          let ethCoin = [];
          Object.keys(prices).forEach((key) => {
            ethCoin.push(prices[key]);
          });
          let currentValue = amount * ethCoin;
          console.log(currentValue);
          res.json(currentValue);
        }).catch(err=>{
          console.error(err)
          return next(err);
      })
    },

    // GET /pct
    changePtc24Hour: function(req, res, next) {
      let coin = 'ETH';
      let currency = 'USD';
      cc.priceFull(coin, currency)
      .then(prices => {
        console.log(prices[coin][currency]["CHANGEPCT24HOUR"]);
        res.json(prices[coin][currency]["CHANGEPCT24HOUR"]);
      }).catch(err=>{
        console.error(err)
        return next(err);
      })
    },

    // GET /month
    getPricesTimespan: function(req, res, next) {
      const coin = 'ETH';
      const lastWeek = timeHelper.last7Days();
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

      (async function loop() {
        for (var i = 0; i < lastWeek.length; i++) {
          await delay(Math.random() * 1000);

          // console.log("first", lastWeek[i]); // this is correct
          // first 2018-01-10T13:06:08.693Z
          // first 2018-01-09T13:06:08.694Z
          // first 2018-01-08T13:06:08.694Z
          // first 2018-01-07T13:06:08.694Z
          // first 2018-01-06T13:06:08.694Z
          // first 2018-01-05T13:06:08.694Z
          // first 2018-01-04T13:06:08.694Z

          cc.priceHistorical(coin, ['USD', 'EUR'], lastWeek[i])
            .then(prices => {

              console.log("second", lastWeek[i]); // this is false
              // second 2018-01-08T13:07:41.512Z
              // second 2018-01-08T13:07:41.512Z
              // second 2018-01-07T13:07:41.512Z
              // second 2018-01-05T13:07:41.512Z
              // second 2018-01-05T13:07:41.512Z
              // second 2018-01-04T13:07:41.512Z
              // second undefined


              // console.log(prices);
              // res.json(prices);
            }).catch(err=>{
              console.error(err)
              return next(err);
            })
        }
      })();
    }
};
