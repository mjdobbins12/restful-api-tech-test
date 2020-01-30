class BasketPricer {
	constructor(currency="USD") {
		this.subtotal = 0;
		this.discounts = [];
		this.discountAmt = 0;
		this.total = 0;
		this.currency = currency;
	}
	
	findTotal(basketItems, prices) {
		// find count of each type of item
		let itemCount = {};
		basketItems.forEach(item => {
			if (itemCount.hasOwnProperty(item)) {
				itemCount[item] += 1;
			} else {
				itemCount[item] = 1;
			}
		});
		// calculate the subtotal for the counted items
		Object.keys(itemCount).forEach(key => {
			if (prices.hasOwnProperty(key)) {
				this.subtotal += (prices[key] * itemCount[key]);
				this.total += (prices[key] * itemCount[key]);
			}
		});
		this.applyDiscounts(itemCount, prices);
		this.convertCurrency();
	}
	
	applyDiscounts(itemCount, prices) {
		// current active offers
		this.appleDiscount(itemCount, prices);
		this.milkDiscount(itemCount, prices);
	}
	
	convertCurrency() {
		const request = require('request');
		const currencyApi = "http://api.currencylayer.com/live?access_key="
			+ process.env.CURRENCYLAYER
			+ "&currencies=USD,EUR,GBP";
		request(currencyApi, { json: true }, (err, res, body) => {
			if (err) { 
				this.messages = "Currency conversion currently unavailable - prices given in USD";
			}
			this.rate = body.quotes[`USD${this.currency}`];
			this.discountAmt = this.subtotal - this.total;
			this.subtotal = Math.round(this.subtotal * this.rate);
			this.discountAmt = Math.round(this.discountAmt * this.rate);
			this.total = Math.round(this.total * this.rate);
			console.log(this);
		});
	}
	
	// here follows the list of discount functions that can be called by applyDiscounts
	
	appleDiscount(itemCount, prices) {
		// 10% discount on apples
		if (itemCount.hasOwnProperty("Apples")) {
			this.total -= Math.round(itemCount["Apples"] * prices["Apples"] * 0.1);
			this.discounts.push("Apples 10% off");
		}
	}
	
	milkDiscount(itemCount, prices) {
		// 50 cents off the total if at least 3 units of milk are purchased
		if (itemCount.hasOwnProperty("Milk") && itemCount["Milk"] >= 3) {
			this.total -= 50;
			this.discounts.push("Milk 50 cents off");
		}
	}
}

module.exports = BasketPricer;
