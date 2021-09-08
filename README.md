# Wallet App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up

Clone this project and run the following command:

`yarn install` or `npm install`

## Development

To run the app in the development mode

`yarn start`

This will open up the client on [http://localhost:3000](http://localhost:3000).

## API

The app makes requests to the api to create wallet and make transactions. Set environment variables for axios to set its default base url.

```
REACT_APP_BASE_URL=http://localhost:5000
```

## ESLint

ESLint will be automatically installed in your application for development. But you need to have the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed for the linter to work.

Add this to `.env` to override `create-react-app`'s default configs:

```
EXTEND_ESLINT=true
ESLINT_NO_DEV_ERRORS=true
```

