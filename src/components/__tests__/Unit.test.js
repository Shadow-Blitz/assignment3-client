import React from 'react';
import Unit from '../Unit';
import { shallow } from 'enzyme';

describe("Unit", () => {
    it("should render correctly", () => {
        const component = shallow(<Unit />);
    });
    it("should render initial layout", () => {
        // when
        const component = shallow(<Unit />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
})