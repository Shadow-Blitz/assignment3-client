import React from 'react';
import CreateProgram from '../CreateProgram';
import { shallow } from 'enzyme';

describe("CreateProgram", () => {
    it("should render correctly", () => {
        const component = shallow(<CreateProgram />);
    });
    it("should render initial layout", () => {
        // when
        const component = shallow(<CreateProgram />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});