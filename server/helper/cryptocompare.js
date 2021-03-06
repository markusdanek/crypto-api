global.fetch = require('node-fetch');
const cc = require('cryptocompare');

module.exports = {
  getCurrentPrice: function(crypto, currency){
    return cc.price(crypto, currency)
      .then(prices => {
        return prices;
      }).catch(console.error)
  },

  coinInUSD: function(crypto, amount, currency){
    return cc.price(crypto, currency)
      .then(prices => {
        const priceArray = [];
        Object.keys(prices).forEach((key) => {
          priceArray.push(prices[key]);
        });
        let priceSum = priceArray.reduce((a, v) => (a+v), 0);
        const currentValue = amount * priceSum;
        return currentValue;
    }).catch(console.error)
  },

  coinsInUSD: function(crypto, amount, currency){
    return cc.priceMulti(crypto, currency)
      .then(prices => {
        let coins = [];
        Object.keys(prices).forEach((key) => {
          coins.push(prices[key]);
        });
        let coinSum = coins.reduce((a, b) => a + b, 0);
        let currentValue = amount * coinSum;
        return currentValue;
    }).catch(console.error)
  },

  changeLast24HourPCT: function(crypto, currency){
    return cc.priceFull(crypto, currency)
      .then(prices => {
        const percentage = prices[crypto][currency]["CHANGEPCT24HOUR"];
        return percentage;
      }).catch(console.error)
  },

  getPricesLast7Days: function(timestamp, crypto, currency){
    return cc.priceHistorical(crypto, [currency], timestamp)
      .then(prices => {
        return [timestamp, prices];
      }).catch(console.error)
  },

  getPricesForTimestamp: function(crypto, timestamp, currency){
    return cc.priceHistorical(crypto, [currency], timestamp)
      .then(prices => {
        return prices;
      }).catch(console.error)
  },
};
