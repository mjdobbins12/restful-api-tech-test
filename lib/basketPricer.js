class BasketPricer {
	constructor() {
		this.subtotal = 0;
		this.total = 0;
	}
	
	addItems(items, prices) {
		items.forEach(item => this.subtotal += prices[item]);
	}
}

module.exports = BasketPricer;
