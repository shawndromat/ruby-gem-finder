import React, { Component } from 'react'

export default class Favorite extends Component {
  handleFavorite = () => {
    this.props.removeFromFavorites(this.props.favorite)
  }

  render = () => {
    const { favorite } = this.props
    return <div>
      <h5 data-test="name" className="gemName">{favorite.name}</h5>
      <button type="button" className="close" aria-label="Close" onClick={this.handleFavorite}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  }
}