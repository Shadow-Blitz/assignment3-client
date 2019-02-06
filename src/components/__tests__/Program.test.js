import React from 'react';
import Program from '../Program';
import { shallow } from 'enzyme';

describe("Program", () => {
    it("should render correctly", () => {
        const component = shallow(<Program />);
    });
    it("should render initial layout", () => {
        // when
        const component = shallow(<Program />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});