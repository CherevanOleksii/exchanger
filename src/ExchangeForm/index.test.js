import { shallow, configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({adapter: new Adapter()})

import ExchangeForm from '.'

describe('>>> Exchange form', () => {

    let wrapper = null
    beforeEach(() => {
        wrapper = mount(<ExchangeForm></ExchangeForm>)
    })

    it('It exists', () => {

    })
})