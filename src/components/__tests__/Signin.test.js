import React from 'react';
import Signin from '../Signin';
import { shallow } from 'enzyme';

describe("Signin", () => {
    it("should render correctly", () => {
        const component = shallow(<Signin />);
    });
    it("should render initial layout", () => {
        // when
        const component = shallow(<Signin />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
})