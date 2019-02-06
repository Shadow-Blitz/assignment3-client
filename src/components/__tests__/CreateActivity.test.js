import React from 'react';
import CreateActivity from '../CreateActivity';
import { shallow } from 'enzyme';

describe("CreateActivity", () => {
    it("should render correctly", () => {
        const component = shallow(<CreateActivity />);
    });
    it("should render initial layout", () => {
        // when
        const component = shallow(<CreateActivity />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});