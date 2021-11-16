import { useEffect, useReducer } from "react"

import ExchagneInput from "../ExchangeInput"
import ExchagneOutput from '../ExchangeOutput'

import { getAllCCY } from "../util/currency"

const ExchangeForm = ({ data = [], onInput }) => {


    const formReducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE_CURRENCY_AMOUNT':
                return {
                    ...state,
                    currencyAmount: action.payload.currencyAmount
                }
            default:
                return state
        }
    }


    const [input, dispatchInput] = useReducer(formReducer,
        {
            currencyAmount: ''
        })


    useEffect( async () => {
        onInput(input.currencyAmount)

        const data = getAllCCY()
        console.log(data)

    }, [input])


    const callbackChangeValue = (value) => {
        dispatchInput({
            type: 'UPDATE_CURRENCY_AMOUNT',
            payload: {
                currencyAmount: value
            }
        })
    }

    return (
        <>
            <ExchagneInput data={data} callbackChangeCurrencyAmount={callbackChangeValue}></ExchagneInput>
            <ExchagneOutput ></ExchagneOutput>
        </>
    )
}

export default ExchangeForm