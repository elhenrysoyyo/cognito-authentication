class AuthTokenValidator {
  #strategy
  #params

  constructor (params) {
    this.#params = params
  }

  setStrategy (strategy) {
    this.#strategy = strategy
  }

  getResponse () {
    return this.#validateToken()
      .then(data => {
        if (data.error) {
          console.log(data)
          const error = new Error()
          error.statusCode = 401
          error.message = data?.error_description
          throw error
        }
        return data
      })
  }

  #validateToken () {
    const path = '/oauth2/userInfo'
    const url = new URL(path, this.#params.domainURL)
    return this.#fetchData(url, this.#params.token)
  }

  #fetchData (url, accessToken) {
    return new Promise(
      (resolve, reject) => {
        fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => response.json())
          .then(data => resolve(data))
          .catch(error => reject(error))
      })
  }
}

module.exports = AuthTokenValidator
