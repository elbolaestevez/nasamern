import React from "react";
import { shallow } from "enzyme";
import NewLanding from "./NewLanding";

describe("NewLanding", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NewLanding />);
    expect(wrapper).toMatchSnapshot();
  });
});
