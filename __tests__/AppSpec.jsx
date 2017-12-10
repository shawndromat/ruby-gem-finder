import React from "react"
import {mount} from "enzyme"
import App from "../src/App"

describe("App", () => {
  const searchMock = jest.fn()
  const fakeClient = {search: searchMock}
  let app

  describe("searching", () => {
    describe("when results are returned", () => {
      beforeEach(() => {
        searchMock.mockReturnValue(
          Promise.resolve([
            {
              name: "rails",
              info: "rails description"
            },
            {
              name: "rails-2.0",
              info: "a better rails description"
            }
          ])
        )

        app = mount(<App client={fakeClient}/>)
      })

      it("displays the results", (done) => {
        whenSearchTermIsEntered("rails")
        setImmediate(() => {
          expect(searchResults().length).toEqual(2)
          done()
        })
      })
    })

    describe("when no results are returned", () => {
      beforeEach(() => {
        searchMock.mockReturnValue(
          Promise.resolve([])
        )

        app = mount(<App client={fakeClient}/>)
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

    function searchResults() {
      app.update()
      return app.find("[data-test=\"search-result\"]")
    }

    function whenSearchTermIsEntered(searchTerm) {
      app.find("[type=\"text\"]").simulate("change", {target: {value: searchTerm}})
      app.find("form").simulate("submit")
    }

    afterEach(() => {
      searchMock.mockClear()
    })
  })
})