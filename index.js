global.fetch = require('node-fetch')
const cc = require('cryptocompare')
const moment = require('moment');
const utils = require("./utils.js");

const lastWeek = utils.last7Days();

function last7Days() {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d);
  }
  return result;
}

function getPrice(coin){
  cc.price(coin, 'USD')
    .then(prices => {
      console.log(prices)
    }).catch(console.error)
}

function getPricesTimespan(timestamp, coin){
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

function ethInUSD(amount){
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
        getPricesTimespan(lastWeek[i], 'ETH')
    }
})();

// Show today
// getPrice('ETH');

// Show current ETH value
// ethInUSD(0.4519);

// Show price change in 24 hours in percent
// changePtc24Hour('ETH', 'USD');
