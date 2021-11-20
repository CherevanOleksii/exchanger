import { shallow, mount, configure, ElementClass } from 'enzyme'
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() })

import ExchangeItem from '.';
import { wrap } from 'regenerator-runtime';

describe(">>> Exchange item ", () => {
    let wrapper = null
    let onHandleInput = null
    let props = null

    beforeEach(() => {
        onHandleInput = jest.fn((value) => { })

        props = {
            img: 'img',
            title: 'Ukraine',
            amount: '5',
            inputValue: '4',
            mainCurrency: 'UAH',
            currency: 'USD',
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

    it('+++ Check is callback work', () => {
        let input = 'some input'
        let onHandleInput = jest.fn((value) => {
            input = value
        })

        wrapper = mount(<ExchangeItem onHandleInput={onHandleInput}></ExchangeItem>)

        wrapper.find('input').simulate('change', { target: { name: 'value', value: '100.10' } })

        expect(wrapper.find('input').prop('value')).toEqual(input)
    })

    it('+++ Check is only numbers', () => {
        wrapper.setProps({
            inputValue: ''
        })

        let re = /^[0-9]+(?:[\.]|[\.][0-9]+)?$/

        let values = [
            "name",
            "1010",
            "00..",
            "some val",
            "1001.312",
            "999"
        ]

        values.forEach(item => {
            let input = 'some input'
            let onHandleInput = jest.fn((value) => {
                input = value
            })
            // Если значение item - число или пустая строка возвращаем item, если нет, то возвращаем пустую строку
            const check = (item === '' || re.test(item))
                ? item
                : ''

            // Создаем новый елемент
            wrapper = mount(<ExchangeItem onHandleInput={onHandleInput}></ExchangeItem>)
            // Находим наш елемент ввода и симулируем ввод текста, в итоге у нас ли
            wrapper.find('input').simulate('change', { target: { name: 'value', value: item } })
            // Проверяем как реагирует наш елемент и то как нужно
            expect(wrapper.find('input').prop('value')).toEqual(check)
        })
    })
})