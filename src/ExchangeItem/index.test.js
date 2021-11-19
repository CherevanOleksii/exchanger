import { shallow, mount, configure } from 'enzyme'
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() })

import ExchangeItem from '.';

describe(">>> Exchange item ", () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = shallow(<ExchangeItem></ExchangeItem>)
    })


    it('Component doesnt null', () => {
        expect(wrapper).not.toBeNull()
    })

    it('Check component props', () => {
        let onHandleInput = jest.fn((value) => {})
        const props = {
            img : null,
            title : 'Ukraine',
            amount : '5',
            inputValue : '4',
            mainCurrency : 'UAH',
            currency : 'USD',
            callbackInput : onHandleInput
        }

        const wrapper = mount(<ExchangeItem {...props} />);
        //Проверяем всё что передали, если 

        expect(wrapper.props()).toEqual(props);
        
        //Проверяем всё по отдельности
        expect(wrapper.props().img).toBeNull
        expect(wrapper.props().title).toEqual('Ukraine')
        expect(wrapper.props().amount).toEqual('5')
        expect(wrapper.props().inputValue).toEqual('4')
        expect(wrapper.props().mainCurrency).toEqual('UAH')
        expect(wrapper.props().currency).toEqual('USD')
        expect(wrapper.props().callbackInput).toEqual(onHandleInput)
        
    })
})