const express = require('express');
const bodyParser = require('body-parser');
const BasketPricer = require('./lib/basketPricer');
const CurrencyConverter = require('./lib/currencyConverter');
const prices = require('./prices');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('welcome');
});

app.post('/', async (req, res) => {
	let items = req.body.items;
	let currency = req.body.currency;
	let currentBasket = new BasketPricer(currency);
	let converter = new CurrencyConverter();
	currentBasket.findTotal(items, prices);
	// let x = await currentBasket.convertCurrency();
	let x = await converter.applyExchangeRate(currentBasket);
	res.send(x);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
