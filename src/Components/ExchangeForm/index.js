//  Загружаем наши стили
import './style.css'

import React from 'react'
// Методы доп информации (локальные)
import { info, getListCCY } from '../../assets/extendedCCY'
// Вспомогательные методы (чтобы перенести часть операций в другой файл)
import { roundUp, indexContains } from '../../assets/util'
// Компонент карточки
import ExchangeItem from "../ExchangeItem"
// Компонент выбора оберации
import ExchagneOperation from '../ExchangeOperation'
// Реакт хуки
import { useEffect, useReducer, useState } from 'react'
// Библиотека для работы с сервером
import axios from 'axios'

// Инициализируем начальное значение 
const ExchangeForm = ({ dataList = [] }) => {
    // Работа в оффлайн режиме
    const getInitialState = (inIndex = 0, leftInputValue = '') => {
        
        let item =  {
            apiDataList: dataList,
            index: inIndex,
            left: {
                img: '',
                title: '',
                amount: '',
                inputValue: leftInputValue,
                mainCurrency: '',
                currency: '',
            },
            right: {
                img: '',
                title: '',
                amount: '',
                inputValue: '',
                mainCurrency: '',
                currency: '',
            }

        }

        console.log(item)
        return item
    }


    //Хук состояния. Название поля глупое, но вполне сгодится, используем для инициализации состояния "Это покупка?" (покупка или не покупка)
    const [isBuy, setIsBuy] = useState( true)

    // Калбек для получения состояния дочернего компонента
    // Присваеваем состояние дочернего компонента родителю
    const handleIsBuy = (isBuyValue) => {
        setIsBuy(isBuyValue)
       
    }

    // Хук для выполнения кода при изменениях в состоянию "Это покупка?"
    // Выполняем запрос
    // Тип запроса
    useEffect(() => {
        dispathExchange({
            type: 'CHANGE_RATE',
        })
    }, [isBuy])
    // Обработчик изменений в левой карточке
    // Выполняем запрос

    const handleLeftInput = (value) => {
        localStorage.setItem('leftInputValue', value)
        dispathExchange({
            // Тип запроса, у нас это изменения в левой карточке
            type: 'LEFT_CHANGE',
            // Передаем состояние  
            payload: {
                // Значение поля ввода левой карточки
                inputValue: value
            }
        })
    }

    // Обработчик изминений в правой карточке
    const handleRightInput = (value) => {
        // Выполняем запрос
        dispathExchange({
            // Тип запроса
            type: 'RIGHT_CHANGE',
            // Передаем состояние
            payload: {
                // Значение поля ввода правой карточки
                inputValue: value
            }
        })
    }

    // Обрабатываем изменение 
    const handleChangeSelect = (event) => {
        // Исполюзую переменную для хранения значения выбраной валюты
        let name = event.target.value

        // С помощью метода получаем индекс в списке
        const index = indexContains(getListCCY(exchange.apiDataList), name)

        // Выполняем запрос
        dispathExchange({
            // Тип запроса
            type: "CHANGE_INDEX",
            // Передаем запроса
            payload: {
                // Значение индекса
                index: index
            }
        })

    }

    const getLeftCardFromData = (data, leftInput = 1) => {
        let { base_ccy } = data
        return {
            // Картинка которую получам из кода валюты
            img: info(base_ccy).img,
            // Заголовок который получаем из кода валюты
            title: info(base_ccy).title,
            // Цена валюты по отношению к основной 
            amount: 1,
            // Данные внутри поля ввода
            inputValue: leftInput,
            // Основная валюта
            mainCurrency: base_ccy,
            // Тип валюты (сбоку от ввода)
            currency: base_ccy,
        }
    }

    const getRightCardFromData = (data, rightInput = 1) => {
        let { base_ccy, ccy, buy, sale } = data
        return {
            img: info(ccy).img,
            title: info(ccy).title,
            // Передаем цену покупки или продажи, также округляю число
            amount: roundUp(isBuy ? buy : sale),
            // Передаю значение ввода правой карточки
            inputValue: rightInput, //
            // Значение основной валюты
            mainCurrency: base_ccy,
            // Значение валюты
            currency: ccy,
        }
    }


    // Reducer? почему? Ибо нам нужно хранить состояние и использовать повидение
    const exchangeReducer = (state, action) => {
        // Определяем тип запроса
        switch (action.type) {
            // Запрос смены типа покупка \ продажа
            case "CHANGE_RATE": {
                if (state.apiDataList.length < 1)
                    return
                console.log(state.apiDataList)
                console.log(state.index)
                let data = state.apiDataList[state.index]

                // Получаем цены 
                let { buy, sale } = data
                // Возвращаем новое состояние
                let leftInputValue = state.left.inputValue ? state.left.inputValue : '1'
                return {
                    // Старое состояние, чтобы не переписывать все сначала
                    ...state,
                    // Новое состояние
                    left: getLeftCardFromData(data, leftInputValue),
                    right: getRightCardFromData(data, roundUp(leftInputValue / (isBuy ? buy : sale)))
                }
            }
            // Запрос при смене валюьы (индекса)
            case "CHANGE_INDEX": {
                // Новый индекс
                let index = action.payload.index
                // "Side effect"
                localStorage.setItem('index', index)
                // Информация о новой валюте
                let data = state.apiDataList[index]
                // Берем поля новой валюты
                let { buy, sale } = data

                // Передаем новое состояние (была мысля чтобы сделать через метод и деконструктор...)
                return {
                    // Дальше как в предыдущих пунктах
                    ...state,
                    index: index,
                    left: getLeftCardFromData(data, state.left.inputValue),
                    right: getRightCardFromData(data, roundUp(state.left.inputValue / (isBuy ? buy : sale)))
                }
            }
            case "LEFT_CHANGE": {
                // Смена ввода в левой карточке 
                let input = action.payload.inputValue
                let data = state.apiDataList[state.index]
                let { buy, sale } = data
                return {
                    ...state,
                    left: getLeftCardFromData(data, input),
                    right: getRightCardFromData(data, roundUp(input / (isBuy ? buy : sale)))
                }
            }
            case "RIGHT_CHANGE": {
                // Смена ввода в правой карточке
                let input = action.payload.inputValue
                let data = state.apiDataList[state.index]
                let { buy, sale } = data
                return {
                    ...state,
                    left: getLeftCardFromData(data, roundUp(input * (isBuy ? buy : sale))),
                    right: getRightCardFromData(data, input)
                }
            }
            case "ERROR": {
                // Запрос при ошибке
                // У нас ошибка (при отсутствии связи с АПИ)
                return {
                    ...state,
                    isError: true
                }
            }
            default:
                return state
        }
    }

    // Сам хук
    const [exchange, dispathExchange] = useReducer(
        // Метод
        exchangeReducer,
        // Состояние
        getInitialState(localStorage.getItem('index') || 0, localStorage.getItem('leftInputValue') || 1)
        
    )

    useEffect(() => {
        localStorage.setItem('leftInputValue', exchange.left.inputValue)
    }, [exchange])

    return ( // Возвращаеи наш компонент (=
        <div className='exchange-form'>
            <div className='exchange-form-header'>
                Currency converter
            </div>
            <ExchagneOperation onCallbackIsBuy={handleIsBuy}> </ExchagneOperation>
            <select className={'exchange-form-type-ccy'} defaultValue={getListCCY(exchange.apiDataList)[exchange.index]} onChange={handleChangeSelect}>
                {exchange.apiDataList ? getListCCY(exchange.apiDataList).map(ccy => <option key={ccy} >{ccy}</option>) : <></>}
            </select>
            <div className='exchange-form-container'>
                <ExchangeItem onHandleInput={handleLeftInput} {...exchange.left} ></ExchangeItem>
                <ExchangeItem onHandleInput={handleRightInput} {...exchange.right}></ExchangeItem>
            </div>
        </div>
    )
}

export default ExchangeForm