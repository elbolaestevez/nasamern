import React from "react";
import { shallow } from "enzyme";
import EditLanding from "./EditLanding";

describe("EditLanding", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EditLanding />);
    expect(wrapper).toMatchSnapshot();
  });
});
