# RESTful API coding assignment

## Use

Install the require node modules with npm install.
From the root directory run node server.js. 
The API will respond to a POST request containing the correctly formatted JSON payload (items:[array], currency: XXX).

## Examples

curl -d '{"items":["Apples", "Apples", "Milk", "Milk", "Milk"], "currency": "GBP"}' -H "Content-Type: application/json" -X POST http://18.219.94.164:8080
{"subtotal":"4.16","discounts":["Apples 10% off","Milk 50 cents off"],"discountAmt":"0.53","total":"3.63","currency":"GBP","rate":0.763255}

## Object-Oriented Design

I have sought to give each class a single responsibility - the BasketPricer class prices a basket of items, and the CurrencyConverter gives an up-to-rate exchange rate. An Item class would allow for expanded functionality in the future: for example, a product search feature that finds items with a category property set to "fruit", then passes those items to the pricer API. As it stands, given that each item currently only has a single property (price), I opted for a single price object to keep things simple for now.

#### Testing

I used the Jasmine testing framework for unit testing, and Postman to test calling the API with various payloads.
