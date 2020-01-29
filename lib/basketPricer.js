class BasketPricer {
	constructor() {
		this.subtotal = 0;
		this.discounts = [];
		this.discountAmt = 0;
		this.total = 0;
		this.currency = "USD";
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
