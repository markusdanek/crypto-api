module.exports = {
  last7Days: function() {
    var result = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(d);
    }
    return result;
  },
  getPrice: function(coin){
    cc.price(coin, 'USD')
      .then(prices => {
        console.log(prices);
        return prices;
      }).catch(console.error)
  },

  getPricesTimespan: function(timestamp, coin){
    cc.priceHistorical(coin, ['USD', 'EUR'], timestamp)
    .then(prices => {
      console.log(timestamp, prices);
    }).catch(console.error)
  },

  changePtc24Hour: function(coin, currency){
    cc.priceFull(coin, currency)
    .then(prices => {
      console.log(prices[coin][currency]["CHANGEPCT24HOUR"]);
    }).catch(console.error)
  },

  ethInUSD: function(amount){
    cc.price('ETH', 'USD')
      .then(prices => {
        const ethCoin = [];
        Object.keys(prices).forEach((key) => {
          ethCoin.push(prices[key]);
        });
        const currentValue = amount * ethCoin;
        console.log(currentValue);

    }).catch(console.error)
  }
};
