import { shallow, configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

import ExchangeForm from '.'

describe('>>> Exchange form', () => {

    let wrapper = null

    let exchangeForm = {
        index: 0,
        apiDataList: [
            { "ccy": "USD", "base_ccy": "UAH", "buy": "26.40000", "sale": "26.66667" },
            { "ccy": "EUR", "base_ccy": "UAH", "buy": "29.85000", "sale": "30.30303" },
            { "ccy": "RUR", "base_ccy": "UAH", "buy": "0.35000", "sale": "0.38000" },
            { "ccy": "BTC", "base_ccy": "USD", "buy": "54141.1403", "sale": "59840.2077" }],
        
        inputValue: 0,

        isLoading: false,
        isError: false,
        isOffline: false,

        left: {
            img: null,
            title: '',
            amount: '',
            inputValue: '',
            mainCurrency: '',
            currency: '',
        },
        right: {
            img: null,
            title: '',
            amount: '',
            inputValue: '',
            mainCurrency: '',
            currency: '',
        }
    }


    beforeEach(() => {
        wrapper = mount(<ExchangeForm exchangeForm={exchangeForm}></ExchangeForm>)
    })

    it('+++ Component exist', () => {
        expect(wrapper).not.toBeNull()
    })

    it('+++ Check all components` properties ', () => {
        <ExchangeForm></ExchangeForm>
    })
})