import './style.scss'

import { info } from '../assets/extendedCCY'
import { roundUp } from '../assets/util'

import ExchangeItem from "../ExchangeItem"
import ExchagneOperation from '../ExchangeOperation'

import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

const ExchangeForm = () => {
    const roundIndex = 5;

    const staticExchange = {
        index: 0,
        apiData: [],
        inputValue: 0,
        left: {
            img: info('').img,
            title: info('').title,
            amount: '',
            inputValue: '',
            mainCurrency: '',
            currency: '',
        },
        right: {
            img: info('').img,
            title: info('').title,
            amount: '',
            inputValue: '',
            mainCurrency: '',
            currency: '',
        }
    }

    useEffect(() => {
        fetch()
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
                let {base_ccy, ccy, buy, sale} = data[state.index]
                let input = 0
                return {    
                    ...state,
                    apiData: data,
                    index: 0,
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
                        inputValue: roundUp((input / (isBuy ? buy : sale)), roundIndex),
                        mainCurrency: base_ccy,
                        currency: ccy,
                    }
                }
            }
            case "LEFT_CHANGE": {
                let input = action.payload.inputValue
                let {base_ccy, ccy, buy, sale} = state.apiData[state.index]

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
                        inputValue: roundUp((input / (isBuy ? buy : sale)), roundIndex),
                        mainCurrency: base_ccy,
                        currency: ccy,
                    }
                }
            }

            case "RIGHT_CHANGE": {
                let input = action.payload.inputValue
                let {base_ccy, ccy, buy, sale} = state.apiData[state.index]

                return {
                    ...state,
                    left: {
                        img: info(base_ccy).img,
                        title: info(base_ccy).title,
                        amount: state.left.amount,
                        inputValue: roundUp(input * (isBuy ? buy : sale), roundIndex),
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
        staticExchange
    )

    const fetch = async () => {
        console.log('1')
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