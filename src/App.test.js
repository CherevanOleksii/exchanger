import App from './App'
import renderer from 'react-test-renderer'

describe('>>> App shallow render components', () => {
  let wrapper;
  const output = 1;

  beforeEach(()=>{
    wrapper = renderer(<App/>);
  });

  it('+++ render App component', ()=> {
    expect(wrapper.length).toEqual(1);
  });
});

