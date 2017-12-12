export default function RubyGemsClient (endpoint) {
  const searchEndpoint = endpoint

  this.search = (query) => {
    if (query) {
      return fetch(`${searchEndpoint}/api/v1/search.json?query=${query}`)
        .then(function(response) {
          return response.json().then(trimJsonArray)
        })
    } else {
      return Promise.resolve([])
    }
  }
}

function trimJsonArray(json) {
  return json.map(trimJson)
}

function trimJson({name, info, project_uri}) {
  return {name, info, project_uri}
}