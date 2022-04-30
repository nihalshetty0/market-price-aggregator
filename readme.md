
# Market Price Aggregator

An API to aggregate market price of commodities from mandis


## Tech Stack

**Server:** Node, Express, MongoDB


## API Reference

#### Post report

```http
  POST /reports
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID` | `string` | **Required**. |
| `marketID` | `string` | **Required**. |
| `marketName` | `string` | **Required**. |
| `cmdtyID` | `string` | **Required**. |
| `marketType` | `string` | **Optional** |
| `cmdtyName` | `string` | **Required**. |
| `priceUnit` | `string` | **Required**. kg/pack/quintal|
| `convFctr` | `string` | **Required**. Factor to convert to kg|
| `price` | `string` | **Required**. |


#### Get item

```http
  GET /reports/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of aggregate report to fetch |





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGOURI`



## Installation

Run the project by running

```bash
  cd market-price-aggregator
  npm install
  node index
```
    
## Run Test

To run text import ```1-market-price-aggregator.postman_collection.json``` on postman as a collection. Now, click on the three dot menu beside the collection name and click ```Run Collection```. This should replicate the test cases.