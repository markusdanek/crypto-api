global.fetch = require('node-fetch')
const cc = require('cryptocompare')

module.exports = {
  getCurrentPrice: function(coin){
    return cc.price(coin, 'USD')
      .then(prices => {
        return prices;
      }).catch(console.error)
  },

  getPricesLast7Days: function(timestamp, coin){
    return cc.priceHistorical(coin, ['USD', 'EUR'], timestamp)
    .then(prices => {
      return [timestamp, prices];
    }).catch(console.error)
  },

  changePtc24Hour: function(coin, currency){
    return cc.priceFull(coin, currency)
    .then(prices => {
      const percentage = prices[coin][currency]["CHANGEPCT24HOUR"];
      return percentage;
    }).catch(console.error)
  },

  coinsInUSD: function(crypto, amount){
    return cc.priceMulti(crypto, 'USD')
      .then(prices => {
        const coins = [];
        Object.keys(prices).forEach((key) => {
          coins.push(prices[key].USD);
        });
        const coinSum = coins.reduce((a, b) => a + b, 0);
        const currentValue = amount * coinSum;
        return currentValue;
    }).catch(console.error)
  }
};
