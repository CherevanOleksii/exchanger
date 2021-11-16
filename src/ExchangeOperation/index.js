import { useEffect, useReducer, useState } from 'react'
import './style.scss'

const ExchagneOperation = ({ callbackIsBuy }) => {

    const btnOperationStyle = {
        active: {
            backgroundColor: '#daeef9',
            color: '#222222',
            fontWeight: "900",
            cursor: 'default'
        },
        disable: {
            backgroundColor: '#edf7fd',
            backgound: 'CADETBLUE',
            color: '#1819b3',
            textDecorationLine: 'underline',
        }
    }


    const operationReducer = (state, action) => {

        switch (action.type) {
            case "BUY":
                return {
                    isBuy: true,
                    btnStyleBuy: {
                        ...btnOperationStyle.active
                    },
                    btnStyleSell: {
                        ...btnOperationStyle.disable
                    }
                }
            case "SELL":
                return {
                    isBuy: false,
                    btnStyleBuy: {
                        ...btnOperationStyle.disable
                    },
                    btnStyleSell: {
                        ...btnOperationStyle.active
                    }
                }
            default:
                return state
        }


    }


    const [operation, dispacherOperation] = useReducer(operationReducer,
        {
            isBuy: true,
            btnStyleBuy: {
                ...btnOperationStyle.active
            },
            btnStyleSell: {
                ...btnOperationStyle.disable
            }
        })



    useEffect(() => {
        callbackIsBuy(operation.isBuy)
    }, [operation])


    const handleButtonSell = (event) => {
        dispacherOperation({
            type: "SELL"
        })
    }


    const handleButtonBuy = (event) => {
        dispacherOperation({
            type: "BUY"
        })
    }


    return (
        <>
            <div className='exchange-operation'>
                <button className='button-buy' style={{ ...operation.btnStyleBuy }} onClick={() => handleButtonBuy()}> Buy </button>
                <button className='button-sell' style={{ ...operation.btnStyleSell }} onClick={() => handleButtonSell()}> Sell </button>
            </div>
        </>
    )
}

export default ExchagneOperation