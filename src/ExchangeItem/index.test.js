import { shallow, mount, configure } from 'enzyme'
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() })

import ExchangeItem from '.';
import { wrap } from 'regenerator-runtime';

describe(">>> Exchange item ", () => {
    let wrapper = null
    let onHandleInput = null
    let props = null
    
    beforeEach(() => {
        onHandleInput = jest.fn((value) => {})
        
        props = {
            img : null,
            title : 'Ukraine',
            amount : '5',
            inputValue : '4',
            mainCurrency : 'UAH',
            currency : 'USD',
            onHandleInput: onHandleInput
        }

        wrapper = mount(<ExchangeItem {...props}></ExchangeItem>)
    })


    it('+++ Component doesnt null', () => {
        expect(wrapper).not.toBeNull()
    })

    it('+++ Check component props', () => {
        //Проверяем всё что передали 
        expect(wrapper.props()).toEqual(props);
        
        //Проверяем всё по отдельности
        expect(wrapper.prop('img')).toBeNull
        expect(wrapper.prop('title')).toEqual('Ukraine')
        expect(wrapper.prop('amount')).toEqual('5')
        expect(wrapper.prop('inputValue')).toEqual('4')
        expect(wrapper.prop('mainCurrency')).toEqual('UAH')
        expect(wrapper.prop('currency')).toEqual('USD')
        expect(wrapper.prop('onHandleInput')).toEqual(onHandleInput)
    })

    it('+++ Check node items', () => {
        expect(wrapper.find('img.image')).toHaveLength(1)
        expect(wrapper.find('div.title')).toHaveLength(1)
        expect(wrapper.find('div.exchange-item-description')).toHaveLength(1)
        expect(wrapper.find('input.exchange-item-input')).toHaveLength(1)
        expect(wrapper.find('div.exchange-item-selected-currency')).toHaveLength(1)      
    })

    
})