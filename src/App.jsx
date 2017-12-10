import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: "",
      searchResults: []
    }
  }

  handleChange = (e) => {
    this.setState({query: e.target.value})
  }

  search = (e) => {
    e.preventDefault()
    this.props.client.search(this.state.query).then(searchResults => {
      this.setState({ searchResults })
    })
  }

  renderResults = () => {
    if (this.state.searchResults.length > 0) {
      return this.state.searchResults.map((result, index) =>
        <li data-test="search-result" key={index}>{result.name}</li>
      )
    } else {
      return "No results found"
    }
  }

  render = () => {
    return <div>
      <h1>Ruby Gem Finder</h1>
      <form onSubmit={this.search}>
        <input type="text" value={this.state.query} onChange={this.handleChange}/>
        <input type="submit"/>
      </form>
      <ul data-test="results">
        {this.renderResults()}
      </ul>
    </div>
  }
}