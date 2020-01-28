const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('hinlo kitt');
});

app.post('/', (req, res) => {
	let items = req.body.items;
	let currency = req.body.currency;
	console.log(req.body);
	res.send(`${items}: ${currency}`);	
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
