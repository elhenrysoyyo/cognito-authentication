class AuthSession {
  #strategy
  #params

  constructor (params) {
    this.#params = params
  }

  setStrategy (strategy) {
    this.#strategy = strategy
  }

  getResponse () {
    const data = this.#getSessionData()
    return data
  }

  #getSessionData () {
    const path = '/oauth2/token'
    const searchParams = new URLSearchParams({
      grant_type: this.#params.grantType,
      client_id: this.#params.clientId,
      redirect_uri: this.#params.originURL,
      code: this.#params.code
    })
    const url = new URL(path, this.#params.domainURL)
    return this.#fetchData(url, searchParams)
  }

  #fetchData (url, body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }
}

module.exports = AuthSession
