const BasketPricer = require('../lib/basketPricer');
const priceList = require('../prices');

describe('BasketPricer', function() {
	beforeEach(function() {
		bp = new BasketPricer();
	});
	
	it('has an inital subtotal and total amount of 0', function() {
		expect(bp.subtotal).toEqual(0);
		expect(bp.total).toEqual(0);	
	});
	
	it('increments the subtotal when a single item is added', function() {
		bp.findTotal(["Apples"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"]);	
	});
	
	it('increments the subtotal when two different items are added', function() {
		bp.findTotal(["Apples", "Milk"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"] + priceList["Milk"]);
	});
	
	it('increments the subtotal when two identical items are added', function() {
		bp.findTotal(["Apples", "Apples"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"] * 2);
	});
	
	it('only increases the subtotal if the item is listed', function() {
		bp.findTotal(["Apples", "Apples", "Quince"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"] * 2);
	});
	
	it('is denominated in USD unless otherwise specified', function() {
		expect(bp.currency).toEqual("USD");	
	});
	
	it('can be initialized with a different currency', function() {
		bpSterling = new BasketPricer("GBP");
		expect(bpSterling.currency).toEqual("GBP");
	});
	
	it('applies the current discount on apples', function() {
		bp.findTotal(["Apples", "Apples", "Apples"], priceList);
		expect(bp.subtotal).toEqual(300);
		expect(bp.total).toEqual(270);
	});
	
	it('applies the apple discount only to apples', function() {
		bp.findTotal(["Apples", "Apples", "Apples", "Soup"], priceList);
		expect(bp.subtotal).toEqual(365);
		expect(bp.total).toEqual(335);
	});
	
	it('applies the current discount on 3 or more units of milk', function() {
		bp.findTotal(["Milk", "Milk", "Milk"], priceList);
		expect(bp.subtotal).toEqual(345);
		expect(bp.total).toEqual(295);
	});
	
	it('does not apply the milk discount to 2 units', function() {
		bp.findTotal(["Milk", "Milk"], priceList);
		expect(bp.subtotal).toEqual(230);
		expect(bp.total).toEqual(230);
	});
	
	it('can apply both apple and milk discounts in the same purchase', function() {
		bp.findTotal(["Milk", "Milk", "Milk", "Apples"], priceList);
		expect(bp.subtotal).toEqual(445);
		expect(bp.total).toEqual(385);
	});
	
	it('has no discounts listed if none are applied', function() {
		expect(bp.discounts).toEqual([]);	
	});
	
	it('lists applied discounts', function() {
		bp.findTotal(["Milk", "Milk", "Milk", "Apples"], priceList);
		expect(bp.discounts).toEqual(["Apples 10% off", "Milk 50 cents off"]);
	});
	
	it('shows a total discount amount of 0 if no discounts are applied', function() {
		bp.findTotal(["Soup"], priceList);
		expect(bp.discountAmt).toEqual(0);
	});
	
	it('shows the total discount amount when discounts are applied', function() {
		bp.findTotal(["Soup", "Milk", "Milk", "Milk", "Apples"], priceList);
		expect(bp.discountAmt).toEqual(60);
	});
});
