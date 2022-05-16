import React from "react";
import { shallow } from "enzyme";
import DetailLanding from "./DetailLanding";

describe("DetailLanding", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DetailLanding />);
    expect(wrapper).toMatchSnapshot();
  });
});
