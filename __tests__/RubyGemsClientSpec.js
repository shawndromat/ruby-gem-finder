import RubyGemsClient from "../src/RubyGemsClient"
import fetchMock from "fetch-mock"

describe("RubyGemsClient", () => {
  const searcher = new RubyGemsClient("http://searchUrl")

  describe("when no query is given", () => {
    it("returns an empty list when no query given", () => {
      return searcher.search().then(results => {
        expect(results).toEqual([])
      })
    })

    it("returns an empty list when empty string given", () => {
      return searcher.search("").then(results => {
        expect(results).toEqual([])
      })
    })
  })

  describe("given the ruby gems api is returning data", () => {
    beforeEach(() => {
      fetchMock.get(
        "http://searchUrl/api/v1/search.json?query=rails",
        [
          {
            name: "rails",
            info: "Rails Gem Description",
            project_uri: "uri"
          }
        ]
      )
    })

    it("returns the search results", () => {
      return searcher.search("rails").then(results => {
        expect(results).toEqual(
          [
            {
              name: "rails",
              info: "Rails Gem Description",
              project_uri: "uri"
            }
          ]
        )
      })
    })
  })
})