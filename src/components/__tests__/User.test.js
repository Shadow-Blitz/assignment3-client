import React from 'react';
import User from '../User';
import { shallow } from 'enzyme';

describe("User", () => {
    it("should render correctly", () => {
        const component = shallow(<User />);
    });
    it("should render initial layout", () => {
        // when
        const component = shallow(<User />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
})