import React from "react"
import {shallow} from "enzyme"
import Favorite from "../src/components/Favorite"

describe("Favorite", () => {
  const fav = {name: "rails"}
  const removeMock = jest.fn()
  const favorite = shallow(<Favorite favorite={fav} removeFromFavorites={removeMock}/>)

  it("renders the favorite", () => {
    expect(favorite.find("[data-test=\"name\"]").text()).toEqual("rails")
  })

  describe("clicking remove", () => {
    beforeEach(() => {
      favorite.find("button").simulate("click")
    })

    it("calls removeFromFavorites", () => {
      expect(removeMock).toHaveBeenCalledWith(fav)
    })
  })
})