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
});