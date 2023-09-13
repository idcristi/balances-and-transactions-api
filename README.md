# Balance and Transactions API

### `GET /balances` 

This endpoint returns what was the balance of the customer on a specific date.
For example:  

```json
{ 
	"amount": 10000, 
	"currency": "EUR", 
	"date": "2022-06-30T23:59:59.577Z" 
}
```

This means, the user had 100 Eur in their bank account on 30/06/2022.
Bear in mind that all amounts are in cents, so `1 Euro` is represented as `100`.
You should assume that today is `30/06/2022`.

### `GET /transactions`

This is going to return a list of all past transactions done by that customer:

```json
{ 
	"transactions": [ 
		{ 
			"amount": -765, 
			"currency": "EUR", 
			"date": "2022-02-07T09:57:27.235Z", 
			"status": "BOOKED" 
		}, 
		{ 
			"amount": -911, 
			"currency": "EUR", 
			"date": "2022-01-03T22:00:09.002Z", 
			"status": "PROCESSED" 
		}, 
        ...
	] 
} 
```

### `GET /historical-balances?from=2022-01-01&to=2022-01-10&sort=desc`
```json
[
    {
        "date": "10/01/2022",
        "amount": 7872,
        "currency": "EUR"
    },
    {
        "date": "09/01/2022",
        "amount": 6791,
        "currency": "EUR"
    },
    {
        "date": "08/01/2022",
        "amount": 6850,
        "currency": "EUR"
    },
    {
        "date": "07/01/2022",
        "amount": 7249,
        "currency": "EUR"
    },
    {
        "date": "06/01/2022",
        "amount": 8196,
        "currency": "EUR"
    },
    {
        "date": "05/01/2022",
        "amount": 7691,
        "currency": "EUR"
    },
    {
        "date": "04/01/2022",
        "amount": 7843,
        "currency": "EUR"
    },
    {
        "date": "03/01/2022",
        "amount": 9571,
        "currency": "EUR"
    },
    {
        "date": "02/01/2022",
        "amount": 9599,
        "currency": "EUR"
    },
    {
        "date": "01/01/2022",
        "amount": 8621,
        "currency": "EUR"
    }
]
```

## How to start the project

### Build the project

```sh
npm run build
```

### Running the server 

```sh
# After cloning the repository, install the dependencies
npm install

# Start the server
npm start


> balances-and-transactions-api@1.0.0 start
> tsx src/server.ts --watch

🚀 Server started on port 3333!
```

### Running the tests

```sh
npm test
```


## API Reference
getHistoricalBalances(from: Date, to: Date, sort?: SortEnum): Promise<any[]>
Calculates historical balances within the specified date range.

from: The start date (JavaScript Date object).

to: The end date (JavaScript Date object).

sort (optional): Sorting order for historical balances. Values: 'asc' (ascending) or 'desc' (descending).

## Completed Assignments
✅ Implemented logging for key events and errors.

✅ Unit Tests.
   
✅ The code is available on a public repository on personal GitHub account.
   
✅ Add a README description to project.

✅ Add documentation for the new endpoint.

## Future Improvements
🚧 Add a linter to the project, e.g. ESLint.

🚧 Add integration tests and more unit tests.
