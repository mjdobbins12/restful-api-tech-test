class BasketPricer {
	constructor(currency="USD") {
		this.subtotal = 0;
		this.discounts = [];
		this.discountAmt = 0;
		this.total = 0;
		this.currency = currency;
	}
	
	addItems(basketItems, prices) {
		let itemCount = {};
		basketItems.forEach(item => {
			if (itemCount.hasOwnProperty(item)) {
				itemCount[item] += 1;
			} else {
				itemCount[item] = 1;
			}
		});
		Object.keys(itemCount).forEach(key => {
			if (prices.hasOwnProperty(key)) {
				this.subtotal += (prices[key] * itemCount[key]);
				this.total += (prices[key] * itemCount[key]);
			}
		});
		this.applyDiscounts(itemCount, prices);
	}
	
	applyDiscounts(itemCount, prices) {
		// 10% discount on apples
		if (itemCount.hasOwnProperty("Apples")) {
			this.total -= Math.round(itemCount["Apples"] * prices["Apples"] * 0.1);
		}
		
		// 50 cents off the total if at least 3 units of milk are purchased
		if (itemCount.hasOwnProperty("Milk") && itemCount["Milk"] >= 3) {
			this.total -= 50;
		}
	}
}

module.exports = BasketPricer;
