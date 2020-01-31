# RESTful API coding assignment

An API that accepts a POST request with a JSON/application payload in the format `{"items:["item1","item2,"itemN"],"currency":"EUR"}` and responds with JSON structured like so: `{"subtotal":"0.00","discounts":["discount1","discountN"],"discountAmt":"0.00","totatl":"0.00","currency":"EUR","message":"optionalMessage"}` 

## Getting started

- Install the required node modules with `npm install` .
- From the project root directory start the server with `node server.js` . 

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

## Testing

I used the [Jasmine testing framework](https://jasmine.github.io/setup/nodejs.html) for unit testing. To run the tests, run `node node_modules/jasmine/bin/jasmine.js` from the root of the project if Jasmine is installed locally, or simply `jasmine` if it's installed globally. 

## Design considerations and further steps

### Object-Oriented Programming

I have aimed to follow the Single Responsibility Principle in designing the classes, with BasketPricer focusing on assigning a price to basket of items, and the CurrencyConverter finding an up-to-rate exchange rate, but see ways to improve this app further in that regard. An Item class would allow for expanded functionality in the future: for example, a product search feature that finds items with a category property set to "fruit", then passes those items to the pricer API. Also, I'd like to extract the specific discounts into a DiscountRule class.
