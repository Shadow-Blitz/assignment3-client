import React from 'react';
import Activity from '../Activity';
import { shallow } from 'enzyme';

describe("Activity", () => {
    it("should render correctly", () => {
        // const activity = {
        //     id: "5c4fc7f8e0662217728fac96",
        //     title: "campfire brownies",
        //     description: "campfire brownies activity description",
        //     ageLevel: {
        //         id: "5c490e484ec6471df76bdc94",
        //         name: "Brownies"
        //     },
        //     user: {
        //         name: {
        //             firstname: "Brownie 1",
        //             lastname: "user",
        //             guidename: "user"
        //         },
        //         id: ("5c4ab72434ce0d1446585281")
        //     },
        //     category: "category 1",
        //     length: 20
        // }
        const component = shallow(<Activity />);
    });
    it("should render initial layout", () => {
        // when
        const component = shallow(<Activity />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});