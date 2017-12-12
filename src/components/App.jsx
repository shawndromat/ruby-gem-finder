import React, {Component} from 'react'
import SearchResult from "./SearchResult"
import Favorite from "./Favorite"
import { reject, isEqual, find } from "lodash"
import "../styles/styles.css"


export default class App extends Component {

  constructor(props) {
    super(props)
    const initialFavorites = props.storage("favorites")

    this.state = {
      query: "",
      searchResults: [],
      favorites: initialFavorites || [],
      searchMessage: "Search for your favorite gem"
    }
  }

  addFavorite = (gem) => {
    if (this.alreadyFavorited(gem)) return
    this.save([...this.state.favorites, gem])
  }

  removeFavorite = (fav) => {
    this.save(reject(this.state.favorites, fav))
  }

  alreadyFavorited = (gem) => {
    return !!find(this.state.favorites, favorite => isEqual(gem, favorite))
  }

  save = (favorites) => {
    this.props.storage("favorites", favorites)
    this.setState({favorites})
  }

  search = (e) => {
    e.preventDefault()
    this.setState({searchMessage: "loading...", searchResults: []})

    this.props.client.search(this.state.query).then(searchResults => {
      this.setState({loading: false})

      if (searchResults.length > 0) {
        this.setState({searchResults, searchMessage: ""})
      } else {
        this.setState({searchMessage: "No results found"})
      }
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
    }
  }

  renderFavorites = () => {
    if (this.state.favorites.length > 0) {
      return this.state.favorites.map((favorite, index) =>
        <Favorite favorite={favorite} removeFromFavorites={this.removeFavorite} key={index}/>
      )
    } else {
      return "No favorites yet"
    }
  }

  render = () => (
    <div>
      <h1>Ruby Gem Finder</h1>
      <div className="row">
        <div className="col">
          <form onSubmit={this.search}>
            <div className="input-group">
              <input type="text" className="form-control"
                     value={this.state.query}
                     onChange={this.handleChange}
              />
              <input type="submit" className="input-group-addon"/>
            </div>
          </form>
          <div data-test="results" className="results">
            {this.state.searchMessage}
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
  )
}