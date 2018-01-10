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
          coins.push(prices[key]);
          console.log("prices", prices);
          console.log("prices[key]", prices[key]);
          console.log("coins", coins);

          // output
          // prices { ETH: { USD: 1332.03 }, BTC: { USD: 14602.09 } }
          // prices[key] { USD: 1332.03 }
          // coins [ { USD: 1332.03 } ]
          // prices { ETH: { USD: 1332.03 }, BTC: { USD: 14602.09 } }
          // prices[key] { USD: 14602.09 }
          // coins [ { USD: 1332.03 }, { USD: 14602.09 } ]

          // goal
          // coins =  [ 1339.64, 14617.95 ]
        });
        // const currentValue = amount * ethCoin;
        // return currentValue;
    }).catch(console.error)
  }
};
