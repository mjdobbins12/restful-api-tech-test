class BasketPricer {
	constructor(currency="USD") {
		this.subtotal = 0;
		this.discounts = [];
		this.discountAmt = 0;
		this.total = 0;
		this.currency = currency;
	}
	
	addItems(items, prices) {
		items.forEach(item => {
			if (prices.hasOwnProperty(item)) {
				this.subtotal += prices[item];
				this.total += this.applyDiscounts(item, prices);
			}
		});
	}
	
	applyDiscounts(item, prices) {
		if (item == "Apples") {
			return Math.round(prices["Apples"] * 0.9);
		}
	}
}

module.exports = BasketPricer;
