import React, { Component } from 'react'

export default class Favorite extends Component {
  render = () => {
    const { favorite } = this.props
    return <div>
      <h3>{favorite.name}</h3>
    </div>
  }
}