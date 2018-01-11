// Example to run locally with Node.js

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

function getCurrentPrice(crypto){
  cc.price(crypto, 'USD')
    .then(prices => {
      console.log("getCurrentPrice: ", prices)
    }).catch(console.error)
}

function getPricesLast7Days(timestamp, crypto){
  cc.priceHistorical(crypto, ['USD', 'EUR'], timestamp)
  .then(prices => {
    console.log(timestamp, prices);
  }).catch(console.error)
}

function changeLast24HourPCT(crypto, currency){
  cc.priceFull(crypto, currency)
  .then(prices => {
    console.log("changeLast24HourPCT: ", prices[crypto][currency]["CHANGEPCT24HOUR"]);
  }).catch(console.error)
}

function coinInUSD(crypto, amount){
  cc.price(crypto, 'USD')
    .then(prices => {
      const ethCoin = [];
      Object.keys(prices).forEach((key) => {
        ethCoin.push(prices[key]);
      });
      const currentValue = amount * ethCoin;
      console.log("coinInUSD: ", currentValue);
  }).catch(console.error)
}

// Show today
getCurrentPrice('ETH');

// Show current ETH value
coinInUSD('ETH', 0.4519);

// Show price change in 24 hours in percent
changeLast24HourPCT('ETH', 'USD');

// Show last week
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async function loop() {
    for (var i = 0; i < lastWeek.length; i++) {
        await delay(Math.random() * 1000);
        getPricesLast7Days(lastWeek[i], 'ETH')
    }
})();
