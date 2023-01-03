class AuthLogin {
  #params

  constructor (params) {
    this.#params = params
  }

  getResponse () {
    const loginURL = this.#getLoginURL()
    return { loginURL }
  }

  #getLoginURL () {
    const path = '/oauth2/authorize'
    const searchParams = new URLSearchParams({
      client_id: this.#params.clientId,
      response_type: this.#params.responseType,
      scope: this.#params.scope,
      redirect_uri: this.#params.originURL,
      identity_provider: this.#params.idProvider
    })
    const url = new URL(path, this.#params.domainURL)
    return `${url}?${decodeURIComponent(searchParams)}`
  }
}

module.exports = AuthLogin
