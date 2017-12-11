import React from "react"
import {mount} from "enzyme"
import SearchResult from "../src/SearchResult"

describe("SearchResult", () => {
  const result = {
    name: "rails",
    info: "rails description"
  }
  let addToFavorites
  let searchResult

  beforeEach(() => {
    addToFavorites = jest.fn()
    searchResult = mount(<SearchResult result={result} addToFavorites={addToFavorites}/>)
  })

  it("renders the result", () => {
    expect(searchResult.find("[data-test=\"name\"]").text()).toEqual("rails")
    expect(searchResult.find("[data-test=\"info\"]").text()).toEqual("rails description")
  })

  describe("favoriting", () => {
    it("adds the favorite to storage", () => {
      searchResult.find("button").simulate("click")
      expect(addToFavorites).toHaveBeenCalled()
    })
  })
})