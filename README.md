# RESTful API coding assignment

## Object-Oriented Design

I have sought to give each class a single responsibility - the BasketPricer class prices a basket of items, and the CurrencyConverter gives an up-to-rate exchange rate. An Item class would allow for expanded functionality in the future: for example, a product search feature that finds items with a category property set to "fruit", then passes those items to the pricer API. As it stands, given that each item currently only has a single property (price), I opted for a single price object in the interests of time.

#### Testing

I used the Jasmine testing framework for unit testing, and Postman to test calling the API with various payloads.

#### A few words on my process

1. The BasketPricer's addItems function takes the list of prices as an argument in order to make it simpler to update and customise prices as needed. There could be different prices in various regions, discounts for customers subscribing to a premium service, or what have you.

2. Similarly, the applyUpdates function can be updated as needed as promotions begin and expire. 
