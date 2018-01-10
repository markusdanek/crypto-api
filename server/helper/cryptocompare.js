global.fetch = require('node-fetch')
const cc = require('cryptocompare')

module.exports = {
  getCurrentPrice: function(coin){
    cc.price(coin, 'USD')
      .then(prices => {
        console.log(prices);
        return prices;
      }).catch(console.error)
  },

  getPricesLast7Days: function(timestamp, coin){
    cc.priceHistorical(coin, ['USD', 'EUR'], timestamp)
    .then(prices => {
      console.log(timestamp, prices);
      return prices;
    }).catch(console.error)
  },

  changePtc24Hour: function(coin, currency){
    cc.priceFull(coin, currency)
    .then(prices => {
      const percentage = prices[coin][currency]["CHANGEPCT24HOUR"];
      console.log(percentage);
      return percentage;
    }).catch(console.error)
  },

  ethCoinsInUSD: function(amount){
    cc.price('ETH', 'USD')
      .then(prices => {
        const ethCoin = [];
        Object.keys(prices).forEach((key) => {
          ethCoin.push(prices[key]);
        });
        const currentValue = amount * ethCoin;
        console.log(currentValue);
        return currentValue;
    }).catch(console.error)
  }
};
