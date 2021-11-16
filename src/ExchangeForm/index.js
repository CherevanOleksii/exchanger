import './style.scss'

import { info, getCCY } from '../assets/extendedCCY'
import { roundUp, indexContains } from '../assets/util'

import ExchangeItem from "../ExchangeItem"
import ExchagneOperation from '../ExchangeOperation'

import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

const ExchangeForm = () => {
    const staticExchange = {
        index: 0,
        apiData: {},
        apiDataList: [],
        listCCY: [],
        inputValue: 0,
        isLoading: false,
        isError: false,
        left: {
            img: info('').img,
            title: info('').title,
            amount: '1',
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
        dispathExchange({
            type: 'CHANGE_RATE',
        })
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

    const handleChangeSelect = (event) => {
        let name = event.target.value

        const index = indexContains(exchange.listCCY, name)

        dispathExchange({
            type: "CHANGE_INDEX",

            payload: {
                index: index
            }
        })

    }


    const exchangeReducer = (state, action) => {

        switch (action.type) {
            case "INIT": {
                return {
                    ...state,
                    isLoading: true
                }
            }

            case "FETCH": {
                let data = action.payload.apiData
                let dataList = action.payload.apiDataList
                let { base_ccy, ccy, buy, sale } = data
                let input = 1

                return {
                    ...state,
                    apiData: data,
                    apiDataList: dataList,
                    isLoading: false,
                    isError: false,
                    listCCY: dataList.map(item => item.ccy),
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
                        amount: roundUp(isBuy ? buy : sale),
                        inputValue: roundUp((input / (isBuy ? buy : sale))),
                        mainCurrency: base_ccy,
                        currency: ccy,
                    }
                }
            }

            case "CHANGE_RATE": {
                let { buy, sale } = state.apiData

                return {
                    ...state,
                    right: {
                        ...state.right,
                        inputValue: roundUp(state.left.inputValue / (isBuy ? buy : sale)),
                        amount: roundUp((isBuy ? buy : sale)),
                    }
                }
            }

            case "CHANGE_INDEX": {
                let index = action.payload.index
                let data = state.apiDataList[index]
                let { base_ccy, ccy, buy, sale } = data

                return {
                    ...state,
                    index: index,
                    apiData: data,
                    left: {
                        img: info(base_ccy).img,
                        title: info(base_ccy).title,
                        amount: state.left.amount,
                        inputValue: roundUp(state.right.inputValue * (isBuy ? buy : sale)),
                        mainCurrency: base_ccy,
                        currency: base_ccy,
                    },
                    right: {
                        img: info(ccy).img,
                        title: info(ccy).title,
                        amount: roundUp((isBuy ? buy : sale)),
                        inputValue: state.right.inputValue,
                        mainCurrency: base_ccy,
                        currency: ccy,
                    }
                }
            }


            case "LEFT_CHANGE": {
                let input = action.payload.inputValue
                let { buy, sale } = state.apiData

                return {
                    ...state,
                    left: {
                        ...state.left,
                        inputValue: input,
                    },
                    right: {
                        ...state.right,
                        inputValue: roundUp((input / (isBuy ? buy : sale))),
                    }
                }
            }

            case "RIGHT_CHANGE": {
                let input = action.payload.inputValue
                let { buy, sale } = state.apiData

                return {
                    ...state,
                    left: {
                        ...state.left,
                        inputValue: roundUp(input * (isBuy ? buy : sale)),
                    },
                    right: {
                        ...state.right,
                        inputValue: input,
                    }
                }
            }

            case "ERROR": {
                console.log('error')
                return {
                    ...state,
                    isError: true
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
        try {
            dispathExchange({
                type: 'INIT'
            })

            axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
                .then(res => dispathExchange({
                    type: 'FETCH',
                    payload: {
                        apiData: res.data[exchange.index],
                        apiDataList: res.data,
                    }
                })
                ).catch(() => {
                    dispathExchange({
                        type: 'ERROR'
                    })
                })
        } catch (error) {
            dispathExchange({
                type: 'ERROR'
            })
        }

    }

    useEffect(() => {

    }, [exchange])


    return (
        <>
            {exchange.isError ?
                <>
                    <h1>Something wrong...</h1>
                    <h2>Pleace check your internet connection =)</h2>
                </>
                :
                <>
                    {
                        !exchange.isLoading ?
                            <div className='exchange-form'>
                                <div className='exchange-form-header'>
                                    Currency converter
                                </div>

                                <ExchagneOperation callbackIsBuy={handleIsBuy}> </ExchagneOperation>

                                <div>
                                    <select onChange={handleChangeSelect}>
                                        {exchange.listCCY.map(item => <option key={item}>{item}</option>)}
                                    </select>
                                </div>

                                <div className='exchange-form-container'>
                                    <ExchangeItem callbackInput={handleLeftInput} {...exchange.left} ></ExchangeItem>
                                    <ExchangeItem callbackInput={handleRightInput} {...exchange.right}></ExchangeItem>
                                </div>

                            </div>
                            :
                            <h2>
                                Is loading...
                            </h2>
                    }
                </>
            }
        </>
    )
}

export default ExchangeForm