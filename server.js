const express = require('express');
const bodyParser = require('body-parser');
const BasketPricer = require('./lib/basketPricer');
const prices = require('./prices');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('welcome');
});

app.post('/', (req, res) => {
	let items = req.body.items;
	let currency = req.body.currency;
	let currentBasket = new BasketPricer(currency);
	currentBasket.addItems(items, prices);
	res.send(currentBasket);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
