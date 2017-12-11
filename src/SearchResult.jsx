import React, { Component } from "react"

export default class SearchResult extends Component {
  handleFavorite = (e) => {
    e.preventDefault()
    this.props.addToFavorites(this.props.result)
  }

  render = () => {
    const { result } = this.props
    return <div>
      <h3 data-test="name">{result.name}</h3>
      <p data-test="info">{result.info}</p>
      <button onClick={this.handleFavorite}>Favorite</button>
    </div>
  }
}