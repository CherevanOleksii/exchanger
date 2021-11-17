import ReactDOM from 'react-dom'

import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import App from './App'
import  ExchangeForm from './ExchangeForm'

configure ({
  adapter: new Adapter()
})

describe('>>>HOME --- Shallow render react components', () => {
 
  it('+++ render App component', () => {
    const app = shallow(<App></App>);
    
    const expectedOutput = '<h1>my</h1>' + 
    <ExchangeForm></ExchangeForm>

    app.setState({value: '[hello]my'})

    const realOutput = app.find('div.App').html()

    expect(realOutput.indexOf(expectedOutput) > -1).toEqual(true)

  })


})