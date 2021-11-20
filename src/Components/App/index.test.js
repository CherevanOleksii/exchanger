import { shallow, configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import App from '.'

configure ({
  adapter: new Adapter()
})

describe('>>>App component', () => {
 
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App></App>)
  })

  it('+++ render App component', () => {
   expect(wrapper).not.toBeNull()
  })

})