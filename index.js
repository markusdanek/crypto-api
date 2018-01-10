global.fetch = require('node-fetch')
const cc = require('cryptocompare')
const moment = require('moment');

const lastWeek = last7Days();

function last7Days() {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d);
  }
  return result;
}

function getCurrentPrice(coin){
  cc.price(coin, 'USD')
    .then(prices => {
      console.log(prices)
    }).catch(console.error)
}

function getPricesLast7Days(timestamp, coin){
  cc.priceHistorical(coin, ['USD', 'EUR'], timestamp)
  .then(prices => {
    console.log(timestamp, prices);
  }).catch(console.error)
}

function changePtc24Hour(coin, currency){
  cc.priceFull(coin, currency)
  .then(prices => {
    console.log(prices[coin][currency]["CHANGEPCT24HOUR"]);
  }).catch(console.error)
}

function ethCoinsInUSD(amount){
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

// Show last week
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async function loop() {
    for (var i = 0; i < lastWeek.length; i++) {
        await delay(Math.random() * 100);
        getPricesLast7Days(lastWeek[i], 'ETH')
    }
})();

// Show today
// getCurrentPrice('ETH');

// Show current ETH value
// ethCoinsInUSD(0.4519);

// Show price change in 24 hours in percent
// getPricesLast7Days('ETH', 'USD');
