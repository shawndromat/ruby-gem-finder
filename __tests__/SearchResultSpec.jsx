import React from "react"
import {mount} from "enzyme"
import SearchResult from "../src/components/SearchResult"

describe("SearchResult", () => {
  const result = {
    name: "rails",
    info: "rails description",
    project_uri: "uri"
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
    expect(searchResult.find("a").prop("href")).toEqual("uri")
  })

  describe("favoriting", () => {
    it("adds the favorite to storage", () => {
      searchResult.find("button").simulate("click")
      expect(addToFavorites).toHaveBeenCalledWith(result)
    })
  })
})