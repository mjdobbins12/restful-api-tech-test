class CurrencyConverter {
	applyExchangeRate(basket) {
		const request = require('request');
		const currencyApi = "http://api.currencylayer.com/live?access_key="
			+ process.env.CURRENCYLAYER
			+ "&currencies=USD,EUR,GBP";
		return new Promise(resolve => {
			request(currencyApi, { json: true }, (err, res, body) => {
				if (err) { 
					this.messages = "Currency conversion currently unavailable - prices given in USD";
				}
				basket.rate = body.quotes[`USD${basket.currency}`];
				basket.subtotal = (basket.subtotal * basket.rate / 100).toFixed(2);
				basket.discountAmt = (basket.discountAmt * basket.rate / 100).toFixed(2);
				basket.total = (basket.total * basket.rate / 100).toFixed(2);
				resolve(basket);
			});
		});
	}
}

module.exports = CurrencyConverter;
