import React, { Component } from "react"

export default class SearchResult extends Component {
  handleFavorite = () => {
    this.props.addToFavorites(this.props.result)
  }

  render = () => {
    const { result } = this.props
    return <div className="gem">
      <h5 data-test="name" className="gemName">{result.name}</h5>
      <a href={result.project_uri} className="link" target="__blank">view dependencies</a>
      <p data-test="info">{result.info}</p>
      <button onClick={this.handleFavorite} className="btn btn-outline-primary">Favorite</button>
    </div>
  }
}