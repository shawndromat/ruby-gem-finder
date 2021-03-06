import React from "react"
import {mount} from "enzyme"
import App from "../src/components/App"

describe("App", () => {
  const searchMock = jest.fn()
  const fakeClient = {search: searchMock}
  const storage = jest.fn()

  let app

  beforeEach(() => {
    app = mount(<App client={fakeClient} storage={storage}/>)
  })

  it("displays a welcome message", () => {
    expect(app.text()).toEqual(expect.stringContaining("Search for your favorite gem"))
  })

  describe("searching", () => {
    describe("when results are returned", () => {
      beforeEach(() => {
        searchMock.mockReturnValue(
          Promise.resolve([
            {name: "rails", info: "rails description"},
            {name: "rails-2.0", info: "a better rails description"}
          ])
        )
      })

      it("displays the results", (done) => {
        whenSearchTermIsEntered("rails")
        setImmediate(() => {
          expect(searchResults().length).toEqual(2)
          done()
        })
      })

      it("shows loading text while searching", (done) => {
        whenSearchTermIsEntered("rails")
        expect(app.text()).toEqual(expect.stringContaining("loading..."))
        setImmediate(() => {
          expect(app.text()).not.toEqual(expect.stringContaining("loading..."))
          done()
        })
      })
    })

    describe("when no results are returned", () => {
      beforeEach(() => {
        searchMock.mockReturnValue(
          Promise.resolve([])
        )
      })

      it("displays an empty state", (done) => {
        whenSearchTermIsEntered("rails")

        setImmediate(() => {
          expect(searchResults().length).toEqual(0)
          expect(app.find("[data-test=\"results\"]").text()).toEqual("No results found")
          done()
        })
      })
    })
  })

  describe("when there are no favorites", () => {
    it("displays empty state", () => {
      expect(app.find("Favorite").length).toEqual(0)
      expect(app.find("[data-test=\"favorites\"]").text()).toEqual("No favorites yet")
    })
  })

  describe("favorites", () => {
    const rails = {name: "rails", info: "rails description"}
    const rspec = {name: "rspec-core", info: "rspec description"}

    describe("when storage has favorites on initialize", () => {
      beforeEach(() => {
        storage.mockReturnValueOnce([rails, rspec])
        app = mount(<App client={fakeClient} storage={storage}/>)
      })

      it("displays all favorites", () => {
        app.update()
        expect(app.find("Favorite").length).toEqual(2)
      })
    })

    describe("adding favorites", () => {
      beforeEach(() => {
        storage.mockClear()
        app.instance().addFavorite(rails)
        app.instance().addFavorite(rspec)
      })

      it("adds them to favorites", () => {
        expect(app.state().favorites).toEqual([rails, rspec])
      })

      it("puts all favorites into localStorage", () => {
        expect(storage).toHaveBeenCalledWith("favorites", [rails, rspec])
      })

      it("displays all favorites", () => {
        app.update()
        expect(app.find("Favorite").length).toEqual(2)
      })

      describe("adding duplicate favorites", () => {
        beforeEach(() => {
          storage.mockClear()
          app.instance().addFavorite(rails)
        })

        it("ignores duplicates", () => {
          expect(app.state().favorites).toEqual([rails, rspec])
        })

        it("puts correct favorites into localStorage", () => {
          expect(storage).not.toHaveBeenCalled()
        })
      })

      describe("removing favorites", () => {
        beforeEach(() => {
          storage.mockClear()
          app.instance().removeFavorite(rails)
        })

        it("returns all the favorites", () => {
          expect(app.state().favorites).toEqual([rspec])
        })

        it("puts all favorites into localStorage", () => {
          expect(storage).toHaveBeenCalledWith("favorites", [rspec])
        })
      })
    })
  })

  function searchResults() {
    app.update()
    return app.find("SearchResult")
  }

  function whenSearchTermIsEntered(searchTerm) {
    app.find("[type=\"text\"]").simulate("change", {target: {value: searchTerm}})
    app.find("form").simulate("submit")
  }

  afterEach(() => {
    searchMock.mockClear()
  })
})