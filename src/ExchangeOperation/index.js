import { useEffect, useReducer, useState } from 'react'
import './style.css'

const ExchagneOperation = ({
    callbackIsBuy
}) => { // Передаем аргументы в параметры, деконструктор чтобы не использовать входящий параметр "props"

    const btnOperationStyle = { // Шаблон "стиль состояние кнопки"
        active: { // Стиль активной кнопки
            backgroundColor: '#daeef9',
            color: '#222222',
            fontWeight: "900",
            cursor: 'default'
        },
        disable: { // Стиль не активной кнопки
            backgroundColor: '#edf7fd',
            backgound: 'CADETBLUE',
            color: '#1819b3',
            textDecorationLine: 'underline',
        }
    }

    const operationInitState = { // Шаблон инициализации 
        isBuy: true,
        btnStyleBuy: {
            ...btnOperationStyle.active
        },
        btnStyleSell: {
            ...btnOperationStyle.disable
        }
    }

    const operationReducer = (state, action) => { // Метод редусера операций
        switch (action.type) { // Распознаем нужный нам тип
            case "BUY": // Нажатие на кнопку купить
                return { // ВОзвражаем новое состояне
                    isBuy: true,
                    btnStyleBuy: {
                        ...btnOperationStyle.active
                    },
                    btnStyleSell: {
                        ...btnOperationStyle.disable
                    }
                }
            case "SELL": // При нажатии кнопки продать 
                return { // Возвращаем новое состояние
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

    const [operation, dispacherOperation] = useReducer( // Хук reducer
        operationReducer, // Метод reducer
        operationInitState // Начальное состояние
    )

    useEffect(() => { // При переключении "isBuy" вызываем callback родителя, передаем состояние isBuy
        callbackIsBuy(operation.isBuy)
    }, [operation])

    const handleButtonSell = (event) => { // Событие нажатия кнопки "продать"
        dispacherOperation({
            type: "SELL"
        })
    }

    const handleButtonBuy = (event) => { // Событие нажатия кнопки "купить"
        dispacherOperation({
            type: "BUY"
        })
    }

    return ( // Возвращаем компонент
        <div className='exchange-operation'>
            <button className='button-buy' style={{ ...operation.btnStyleBuy }} onClick={() => handleButtonBuy()}> Buy </button>
            <button className='button-sell' style={{ ...operation.btnStyleSell }} onClick={() => handleButtonSell()}> Sell </button>
        </div>
    )
}

export default ExchagneOperation