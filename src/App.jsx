import React, {Component} from 'react'
import SearchResult from "./SearchResult"
import Favorite from "./Favorite"
import { includes, reject, isEqual, find } from "lodash"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: "",
      searchResults: [],
      favorites: []
    }
  }

  addFavorite = (gem) => {
    if (this.alreadyFavorited(gem)) return
    this.setState({favorites: [...this.state.favorites, gem]})
    this.save()
  }

  removeFavorite = (fav) => {
    this.setState({favorites: reject(this.state.favorites, fav)})
    this.save()
  }

  alreadyFavorited = (gem) => {
    return !!find(this.state.favorites, favorite => isEqual(gem, favorite))
  }

  save = () => {
    this.props.storage.setItem("favorites", JSON.stringify(this.state.favorites))
  }

  search = (e) => {
    e.preventDefault()
    this.props.client.search(this.state.query).then(searchResults => {
      this.setState({searchResults})
    })
  }

  handleChange = (e) => {
    this.setState({query: e.target.value})
  }

  renderResults = () => {
    if (this.state.searchResults.length > 0) {
      return this.state.searchResults.map((result, index) =>
        <SearchResult result={result} addToFavorites={this.addFavorite} key={index}/>
      )
    } else {
      return "No results found"
    }
  }

  renderFavorites = () => {
    if (this.state.favorites.length > 0) {
      return this.state.favorites.map((favorite, index) =>
        <Favorite favorite={favorite} key={index}/>
      )
    } else {
      return "No favorites yet"
    }
  }

  render = () => {
    return <div>
      <h1>Ruby Gem Finder</h1>
      <div className="row">
        <div className="col">
          <form onSubmit={this.search}>
            <input type="text" value={this.state.query} onChange={this.handleChange}/>
            <input type="submit"/>
          </form>
          <div data-test="results">
            {this.renderResults()}
          </div>
        </div>
        <div className="col">
          <h3>Favorites</h3>
          <div data-test="favorites">
            {this.renderFavorites()}
          </div>
        </div>
      </div>
    </div>
  }
}