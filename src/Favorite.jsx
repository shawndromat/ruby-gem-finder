import React, { Component } from 'react'

export default class Favorite extends Component {
  handleFavorite = () => {
    this.props.removeFromFavorites(this.props.favorite)
  }

  render = () => {
    const { favorite } = this.props
    return <div>
      <h3 data-test="name">{favorite.name}</h3>
      <button onClick={this.handleFavorite}>Remove</button>
    </div>
  }
}