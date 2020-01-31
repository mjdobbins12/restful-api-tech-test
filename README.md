# RESTful API coding assignment

An API that checks the total price of a basket of items. It accepts a POST request with an application/JSON payload in the format `{"items:["item1","item2,"itemN"],"currency":"EUR"}` and responds with JSON structured like so: `{"subtotal":"0.00","discounts":["discount1","discountN"],"discountAmt":"0.00","totatl":"0.00","currency":"EUR"}` 

## Getting started

- Install the required node modules with `npm install`
- From the project root directory start the server with `node server.js`

### Prerequisites

- Node.js
- You will need a Currency Layer API access key to get currency exchange rates. A free tier account allows for conversion from USD to GBP or EUR.

### Examples

Request: 
```
curl -d '{"items":["Apples", "Apples", "Milk", "Milk", "Milk"], "currency": "GBP"}' -H "Content-Type: application/json" -X POST http://localhost:8080
```
Response: 
```
{"subtotal":"4.16","discounts":["Apples 10% off","Milk 50 cents off"],"discountAmt":"0.53","total":"3.63","currency":"GBP"}
```

Currency is optional in the request and will default to USD: 
```
curl -d '{"items":["Apples", "Apples", "Milk", "Milk", "Soup"]}' -H "Content-Type: application/json" -X POST http://localhost:8080
```
Response:
```
{"subtotal":"4.95","discounts":["Apples 10% off"],"discountAmt":"0.20","total":"4.75","currency":"USD"}
```

If no items are sent:
```
curl -d '{"currency":"EUR"}' -H "Content-Type: application/json" -X POST http://localhost:8080
```
The following message is returned with status 400:
```
No items found to price. Check your request and try again
```

## Testing

I used the [Jasmine testing framework](https://jasmine.github.io/setup/nodejs.html) for unit testing. To run the tests, run `node node_modules/jasmine/bin/jasmine.js` from the root of the project if Jasmine is installed locally, or simply `jasmine` if it's installed globally. 

## Design considerations and further steps

### Object-Oriented Programming

I have aimed to follow the Single Responsibility Principle in designing the classes, with BasketPricer focusing on assigning a price to basket of items, and the CurrencyConverter finding an up-to-rate exchange rate, but see ways to improve this app further in that regard. An Item class would allow for expanded functionality in the future: for example, a product search feature that finds items with a category property set to "fruit", then passes those items to the pricer API. Also, I'd like to extract the specific discounts into a DiscountRule class.

### Error handling

I've attempted to address what I thought were the most obvious things that could go wrong with handling an incoming POST request - missing or incorrect item or currency data. Returning more expressive error messages to the user and handling different types of error would be areas I'd focus on in improving this API.

## Reflection on my process

This was one of the first times I've used Node.js, and the first time I've built an API. I opted for the standard Express web framework as it's well-documented and widely used, and there were no specific reasons against using it. After getting a rudimentary server running, I used TDD to create the core BasketPricer class. Lastly I focused on getting to grips with promises and async/await functions, which I saw as the only way to ensure the currency was converted after the items were priced and a response sent back to the client. 