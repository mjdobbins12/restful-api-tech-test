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
			}
		});
	}
}

module.exports = BasketPricer;
