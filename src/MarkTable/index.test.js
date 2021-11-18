import { shallow, configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import MarkTable from './index'

configure({
    adapter: new Adapter()
})

describe(">>> MarkTable component ", () => {
    const onCountChange = jest.fn()
    let wrapper = mount(<MarkTable onCountChange={onCountChange} ></MarkTable>)

    it("+++ render MarkTable", () => {
        expect(wrapper).not.toBeNull()
        
    })

    it("+++ Check callback", () => {
        wrapper.find('button').simulate('click')
        wrapper.find('button').simulate('click')
        wrapper.find('button').simulate('click')
        expect(onCountChange).toBeCalledTimes(3)
    })


})