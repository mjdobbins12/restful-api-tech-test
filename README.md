# RESTful API coding assignment

## Overview

This API accepts a JSON input containing an array of items and an optional currency, and returns a JSON output containing the basket subtotal, discount information, total, and currency. The overall design is motivated by adaptability and extensibility: I would like it to be as easy as possible for hypothetical future users to add new features, update prices, and apply or unapply future discounts.

## Testing

I used the Jasmine testing framework for unit testing, and Postman to test calling the API with various payloads.

## A few words on my process

1. The BasketPricer's addItems function takes the list of prices as an argument in order to make it simpler to update and customise prices as needed. There could be different prices in various regions, discounts for customers subscribing to a premium service, or what have you.

2. Similarly, the applyUpdates function can be updated as needed as promotions begin and expire. 
