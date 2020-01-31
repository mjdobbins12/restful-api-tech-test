class CurrencyConverter {
	applyExchangeRate(basket) {
		const request = require('request');
		const currencyApi = "http://api.currencylayer.com/live?access_key="
			+ process.env.CURRENCYLAYER
			+ "&currencies=USD,EUR,GBP";
		return new Promise((resolve, reject) => {
			request(currencyApi, { json: true }, (err, res, body) => {
				if (err) { 
					"Currency conversion unavailable - try again using GBP or EUR";
				}
				let rate = body.quotes[`USD${basket.currency}`];
				if (rate == null) { reject("Currency conversion unavailable - try again using GBP or EUR")}
				basket.subtotal = (basket.subtotal * rate / 100).toFixed(2);
				basket.discountAmt = (basket.discountAmt * rate / 100).toFixed(2);
				basket.total = (basket.total * rate / 100).toFixed(2);
				resolve(basket);
			});
		});
	}
}

module.exports = CurrencyConverter;
