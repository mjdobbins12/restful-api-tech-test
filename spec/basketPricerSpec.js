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
		bp.addItems(["Apples"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"]);	
	});
	
	it('increments the subtotal when two different items are added', function() {
		bp.addItems(["Apples", "Milk"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"] + priceList["Milk"]);
	});
	
	it('increments the subtotal when two identical items are added', function() {
		bp.addItems(["Apples", "Apples"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"] * 2);
	});
	
	it('only increases the subtotal if the item is listed', function() {
		bp.addItems(["Apples", "Apples", "Quince"], priceList);
		expect(bp.subtotal).toEqual(priceList["Apples"] * 2);
	});
	
	it('is denominated in USD unless otherwise specified', function() {
		expect(bp.currency).toEqual("USD");	
	});
});