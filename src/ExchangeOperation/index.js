import { useEffect, useReducer, useState } from 'react'
import './style.css'

// Передаем аргументы в параметры, деконструктор чтобы не использовать входящий параметр "props"
const ExchagneOperation = ({
    onCallbackIsBuy = (isBuy) => { }
}) => {
    // Шаблон "стиль состояние кнопки"

    const btnOperationStyle = {
        // Стиль активной кнопки
        active: {
            backgroundColor: '#daeef9',
            color: '#222222',
            fontWeight: "900",
            cursor: 'default'
        },
        // Стиль не активной кнопки
        disable: {
            backgroundColor: '#edf7fd',
            backgound: 'CADETBLUE',
            color: '#1819b3',
            textDecorationLine: 'underline',
        }
    }
    // Шаблон инициализации 
    const operationInitState = {
        isBuy: true,
        btnStyleBuy: {
            ...btnOperationStyle.active
        },
        btnStyleSale: {
            ...btnOperationStyle.disable
        }
    }

    // Метод редусера операций
    const operationReducer = (state, action) => {
        // Распознаем нужный нам тип
        switch (action.type) {
            // Нажатие на кнопку купить
            case "BUY":
                // Вoзвражаем новое состояне
                return {
                    isBuy: true,
                    btnStyleBuy: {
                        ...btnOperationStyle.active
                    },
                    btnStyleSale: {
                        ...btnOperationStyle.disable
                    }
                }
            // При нажатии кнопки продать 
            case "SALE":
                // Возвращаем новое состояние
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
    
    // Хук reducer
    const [operation, dispacherOperation] = useReducer(
        // Метод reducer
        operationReducer,
        // Начальное состояние
        operationInitState
    )
    
    // При переключении "isBuy" вызываем callback родителя, передаем состояние isBuy
    useEffect(() => {
        onCallbackIsBuy(operation.isBuy)
    }, [operation])

    // Событие нажатия кнопки "продать"
    const handleButtonSale = (event) => {
        dispacherOperation({
            type: "SALE"
        })
    }

    // Событие нажатия кнопки "купить"
    const handleButtonBuy = (event) => {
        dispacherOperation({
            type: "BUY"
        })
    }

    // Возвращаем компонент
    return ( 
        <div className='exchange-operation'>
            <button className='button-buy' style={{ ...operation.btnStyleBuy }} onClick={() => handleButtonBuy()}> Buy </button>
            <button className='button-sale' style={{ ...operation.btnStyleSale }} onClick={() => handleButtonSale()}> Sale </button>
        </div>
    )
}

export default ExchagneOperation