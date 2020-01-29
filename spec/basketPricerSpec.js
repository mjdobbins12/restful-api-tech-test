const BasketPricer = require('../lib/basketPricer');

describe('BasketPricer', function() {
	beforeEach(function() {
		bp = new BasketPricer();	
	});
	
	it('has an inital subtotal and total amount of 0', function() {
		expect(bp.subtotal).toEqual(0);
		expect(bp.total).toEqual(0);	
	});	
});