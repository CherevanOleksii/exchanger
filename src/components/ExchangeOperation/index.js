import { useEffect, useReducer, useState } from 'react'
import './style.css'

const ExchagneOperation = ({
    onCallbackIsBuy = (isBuy) => { }
}) => {
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
    
    let valueToSelect = (localStorage.getItem('isBuy') === 'sale')
    
    const operationInitState = (!valueToSelect) 
        ? {
            isBuy: true,
            btnStyleBuy: {
                ...btnOperationStyle.active
            },
            btnStyleSale: {
                ...btnOperationStyle.disable
            }
        } : {
            isBuy: false,
            btnStyleBuy: {
                ...btnOperationStyle.disable
            },
            btnStyleSale: {
                ...btnOperationStyle.active
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
                    btnStyleSale: {
                        ...btnOperationStyle.disable
                    }
                }
            
            case "SALE":
                
                return {
                    isBuy: false,
                    btnStyleBuy: {
                        ...btnOperationStyle.disable
                    },
                    btnStyleSale: {
                        ...btnOperationStyle.active
                    }
                }
            default:
                return state
        }
    }

    
    const [operation, dispacherOperation] = useReducer(
        
        operationReducer,
        
        operationInitState
    )

    
    useEffect(() => {
        onCallbackIsBuy(operation.isBuy)
        localStorage.setItem('isBuy', operation.isBuy ? 'buy' : 'sale')
    }, [operation])

    
    const handleButtonSale = (event) => {
        dispacherOperation({
            type: "SALE"
        })
    }

    
    const handleButtonBuy = (event) => {
        dispacherOperation({
            type: "BUY"
        })
    }

    
    return (
        <div className='exchange-operation'>
            <button className='button-buy' style={{ ...operation.btnStyleBuy }} onClick={() => handleButtonBuy()}> Buy </button>
            <button className='button-sale' style={{ ...operation.btnStyleSale }} onClick={() => handleButtonSale()}> Sale </button>
        </div>
    )
}

export default ExchagneOperation