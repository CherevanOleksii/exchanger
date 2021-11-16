import './style.scss'

import { info as info } from '../assets/extendedCCY'

import ExchangeItem from "../ExchangeItem"
import ExchagneOperation from '../ExchangeOperation'

import { useEffect, useReducer, useState } from 'react'

const ExchangeForm = () => {


    const [isBuy, setIsBuy] = useState(true)


    const handleIsBuy = (isBuyValue) => {
        setIsBuy(isBuyValue)
    }
    
    useEffect(() => {
        console.log(isBuy)
    }, [isBuy])
    
    const exchangeReducer = (state, action) => {
        switch (action.type) {
            case "":
            default:
                return state
        }
    }

    const handleLeftInput = (value) => {
        console.log(value)
    }

    const handleRightInput = (value) => {
        console.log(value)
    }

    const [exchange, setExchange] = useReducer(
        exchangeReducer,
        {
            left: {
                img: info('UAN').img,
                callbackInput:  handleLeftInput ,
                title: info('UAN').title,
                amount: '1',
                mainCurrency: 'UAN',
                currency: 'UAN',
            },  
            right: {
                img: info('USD').img,
                callbackInput: handleLeftInput ,
                title: info('USD').title,
                amount: '26.8',
                mainCurrency: 'UAN',
                currency: 'USD',
            }
        }
    )



    return (
        <div className='exchange-form'>
            <div className='exchange-form-header'>
                Currency converter
            </div>

           <ExchagneOperation callbackIsBuy={handleIsBuy}> </ExchagneOperation>

            <div className='exchange-form-container'>
                <ExchangeItem {...exchange.left} ></ExchangeItem>
                <ExchangeItem {...exchange.right}></ExchangeItem>
            </div>

        </div>
    )
}

export default ExchangeForm