const AuthLogin = require('./authLogin')
const AuthSession = require('./authSession')
const AuthTokenValidator = require('./authToken')

class Auth {
  #strategy

  setStrategy (strategy) {
    this.#strategy = strategy
  }

  getResponse () {
    return this.#strategy.getResponse()
  }
}

module.exports = {
  Auth,
  AuthLogin,
  AuthSession,
  AuthTokenValidator
}
