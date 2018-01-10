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
      return prices;
    }).catch(console.error)
  },

  changePtc24Hour: function(coin, currency){
    return cc.priceFull(coin, currency)
    .then(prices => {
      const percentage = prices[coin][currency]["CHANGEPCT24HOUR"];
      return percentage;
    }).catch(console.error)
  },

  ethCoinsInUSD: function(amount){
    return cc.price('ETH', 'USD')
      .then(prices => {
        const ethCoin = [];
        Object.keys(prices).forEach((key) => {
          ethCoin.push(prices[key]);
        });
        const currentValue = amount * ethCoin;
        return currentValue;
    }).catch(console.error)
  }
};
