const { Auth, AuthLogin, AuthSession, AuthTokenValidator } = require('./strategy')

const {
  COGNITO_DOMAIN_NAME_URL: domainURL,
  COGNITO_CLIENT_ID: clientId,
  COGNITO_LOGIN_RESPONSE_TYPE: responseType,
  COGNITO_LOGIN_SCOPE: scope,
  COGNITO_ID_PROVIDER: idProvider,
  COGNITO_LOGIN_GRANT_TYPE: grantType
} = process.env

const strategySelector = (code, token) => {
  if (token) return AuthTokenValidator
  if (code) return AuthSession
  return AuthLogin
}

module.exports = async (req, res, next) => {
  try {
    const { code } = req.query
    const { access_token: token } = req.headers
    const options = { domainURL, clientId, responseType, scope, idProvider, grantType, code, token }
    options.originURL = req.get('originalUrl')

    const auth = new Auth()
    const Strategy = strategySelector(code, token)
    auth.setStrategy(new Strategy(options))
    const response = await auth.getResponse()

    if (Strategy === AuthTokenValidator) return next()
    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    const { statusCode, message } = error
    return res.status(statusCode).json({ message })
  }
}
