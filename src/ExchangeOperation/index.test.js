import { shallow, mount, configure, render } from 'enzyme'
import sinon from 'sinon'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })
// import { createSerializer } from 'enzyme-to-json'

import ExchagneOperation from '.'

let wrapper = null


beforeEach(() => {
    wrapper = shallow(<ExchagneOperation ></ExchagneOperation>)    
})

afterEach(() => {
    wrapper = null
})

describe('>>> ExchangeOperation', () => {
    it('+++ Is it render', () => {
        expect(wrapper).not.toBeNull()
    })

    it('+++ Is it have two buttons', () => {
        wrapper = shallow(<ExchagneOperation />)

        expect(wrapper.find('button.button-buy')).not.toBeNull();

        expect(wrapper.find('button.button-sale')).not.toBeNull();
    })

    it('+++ Is button buy and sale work', () => {
        let isBuy = false
        let onCallbackIsBuy = jest.fn((value) => {
            isBuy = value            
        })
        wrapper = mount(<ExchagneOperation onCallbackIsBuy={onCallbackIsBuy}/>)

        expect(isBuy).toBe(true)

        wrapper.find('button.button-buy').simulate('click')
        expect(isBuy).toBe(true)

        wrapper.find('button.button-sale').simulate('click')
        expect(isBuy).toBe(false)        
    })

   
})