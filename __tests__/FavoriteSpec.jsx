import React from "react"
import {shallow} from "enzyme"
import Favorite from "../src/Favorite"

describe("Favorite", () => {
  const fav = {name: "rails"}
  const favorite = shallow(<Favorite favorite={fav}/>)

  it("renders the favorite", () => {
    expect(favorite.text()).toEqual("rails")
  })
})