# cognito-authentication
## cognito authentication - express server side

## Install
```
npm install @pd-node/cognito-authentication
```
## Requirements
Environment variables
```
COGNITO_DOMAIN_NAME_URL: <conito_base_url>
COGNITO_CLIENT_ID: <clientId>,
COGNITO_LOGIN_RESPONSE_TYPE: <type example: code>,
COGNITO_LOGIN_SCOPE: <scope>,
COGNITO_ID_PROVIDER: <idProvider>,
COGNITO_LOGIN_GRANT_TYPE: <grantType>
```

## Usage
* Javascript - Express nodejs

* example: in app router

```
const cognitoAuthentication = require('@pd-node/cognito-authentication')
const router = require('express').Router()

router.get('/login', cognitoAuthentication) // to login

router.get('/test', cognitoAuthentication, (req, res) => { return res.send('server ok')}) // used as middleware
...
```
