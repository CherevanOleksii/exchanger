import './style.scss'

import { info as info } from '../assets/extendedCCY'

import ExchangeItem from "../ExchangeItem"
import ExchagneOperation from '../ExchangeOperation'

import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

const ExchangeForm = () => {

    useEffect(() => {
        fetch()
        dispathExchange({
            type: 'IS_BUY'
        })
    }, [])

    const [isBuy, setIsBuy] = useState(true)

    const handleIsBuy = (isBuyValue) => {
        setIsBuy(isBuyValue)
    }

    useEffect(() => {

    }, [isBuy])




    const handleLeftInput = (value) => {
        dispathExchange({
            type: 'LEFT_CHANGE',
            payload: {
                inputValue: value
            }
        })
    }

    const handleRightInput = (value) => {
        dispathExchange({
            type: 'RIGHT_CHANGE',
            payload: {
                inputValue: value
            }
        })
    }




    const exchangeReducer = (state, action) => {

        switch (action.type) {
            case "FETCH": {
                let data = action.payload.apiData

                return {
                    ...state,
                    apiData: data,
                }
            }
            case "LEFT_CHANGE": {
                let input = action.payload.inputValue
                let selectedItem = state.apiData[state.index]
                let {base_ccy, ccy, buy, sale} = selectedItem

                return {
                    ...state,
                    left: {
                        img: info(base_ccy).img,
                        title: info(base_ccy).title,
                        amount: state.left.amount,
                        inputValue: input,
                        mainCurrency: base_ccy,
                        currency: base_ccy,
                    },
                    right: {
                        img: info(ccy).img,
                        title: info(ccy).title,
                        amount: isBuy ? buy : sale,
                        inputValue: input / (isBuy ? buy : sale),
                        mainCurrency: base_ccy,
                        currency: ccy,
                    }
                }
            }

            case "RIGHT_CHANGE": {
                let input = action.payload.inputValue
                let selectedItem = state.apiData[state.index]
                let {base_ccy, ccy, buy, sale} = selectedItem

                return {
                    ...state,
                    left: {
                        img: info(base_ccy).img,
                        title: info(base_ccy).title,
                        amount: state.left.amount,
                        inputValue: input * (isBuy ? buy : sale),
                        mainCurrency: base_ccy,
                        currency: base_ccy,
                    },
                    right: {
                        img: info(ccy).img,
                        title: info(ccy).title,
                        amount: isBuy ? buy : sale,
                        inputValue: input,
                        mainCurrency: base_ccy,
                        currency: ccy,
                    }
                }
            }
            default:

                return state
        }
    }


    const [exchange, dispathExchange] = useReducer(
        exchangeReducer,
        {
            index: 0,
            apiData: [],
            inputValue: 0,
            left: {
                img: info('UAH').img,
                title: info('').title,
                amount: '',
                inputValue: '',
                mainCurrency: 'UAH',
                currency: 'UAH',
            },
            right: {
                img: info('USD').img,
                title: info('USD').title,
                amount: '',
                inputValue: '',
                mainCurrency: 'UAH',
                currency: 'USD',
            }
        }
    )

    const fetch = () => {
        axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then(res => dispathExchange({
                type: 'FETCH',
                payload: {
                    apiData: res.data
                }
            }))
    }

    useEffect(() => {

    }, [exchange])


    return (
        <div className='exchange-form'>
            <div className='exchange-form-header'>
                Currency converter
            </div>

            <ExchagneOperation callbackIsBuy={handleIsBuy}> </ExchagneOperation>

            <div className='exchange-form-container'>
                <ExchangeItem callbackInput={handleLeftInput} {...exchange.left} ></ExchangeItem>
                <ExchangeItem callbackInput={handleRightInput} {...exchange.right}></ExchangeItem>
            </div>

        </div>
    )
}

export default ExchangeForm