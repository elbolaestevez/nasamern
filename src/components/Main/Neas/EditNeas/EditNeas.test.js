import React from "react";
import { shallow } from "enzyme";
import EditNeas from "./EditNeas";

describe("EditNeas", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EditNeas />);
    expect(wrapper).toMatchSnapshot();
  });
});
