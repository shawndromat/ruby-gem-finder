export default function RubyGemsClient (endpoint) {
  const searchEndpoint = endpoint

  this.search = (query) => {
    if (query) {
      return fetch(`${searchEndpoint}/api/v1/search.json?query=${query}`)
        .then(function(response) {
          return response.json()
        })
    } else {
      return Promise.resolve([])
    }
  }
}