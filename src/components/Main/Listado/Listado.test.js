import React from "react";
import { shallow } from "enzyme";
import Listado from "./Listado";

describe("Listado", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Listado />);
    expect(wrapper).toMatchSnapshot();
  });
});
