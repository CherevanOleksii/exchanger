//  Загружаем наши стили
import './style.css'

import React from 'react'
// Методы доп информации (локальные)
import { info, getCCY } from '../assets/extendedCCY'
// Вспомогательные методы (чтобы перенести часть операций в другой файл)
import { roundUp, indexContains } from '../assets/util'
// Компонент карточки
import ExchangeItem from "../ExchangeItem"
// Компонент выбора оберации
import ExchagneOperation from '../ExchangeOperation'
// Реакт хуки
import { useEffect, useReducer, useState } from 'react'
// Bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import { Spinner } from 'react-bootstrap'
// Библиотека для работы с сервером
import axios from 'axios'

// Инициализируем начальное значение 
const ExchangeForm = ({ isOffline = false }) => {
    const staticAPI = [
        {"ccy":"USD","base_ccy":"UAH","buy":"26.40000","sale":"26.66667"},
        {"ccy":"EUR","base_ccy":"UAH","buy":"29.85000","sale":"30.30303"},
        {"ccy":"RUR","base_ccy":"UAH","buy":"0.35000","sale":"0.38000"},
        {"ccy":"BTC","base_ccy":"USD","buy":"54141.1403","sale":"59840.2077"}]
    
    const exchangeForm = {
        index: 0,
        // Работа в оффлайн режиме
        apiDataList: [staticAPI[0]],
        inputValue: 0,

        isLoading: false,
        isError: false,

        left: {
            img: '',
            title: '',
            amount: '',
            inputValue: '',
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
    // Код исполняемый при запуске программы (в нашем случае для запроса данных) 
    // Метод для запроса данных с сервера
    // В прослуше пусто, следовательно метод не будет повторно выполнятся 
    useEffect(() => {
        if (isOffline)
            dispathExchange({
                type: 'FETCH',
                payload: {
                    apiDataList: exchangeForm.apiDataList,
                    index: 0
                }
            })
        else
            fetch()
    }, [])

    //Хук состояния. Название поля глупое, но вполне сгодится, используем для инициализации состояния "Это покупка?" (покупка или не покупка)
    const [isBuy, setIsBuy] = useState(true)

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
        const index = indexContains(exchange.apiDataList.map(item => item.ccy), name)

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
            // Запрос "инициализация" для инициализац
            case "INIT": {
                // Обновляем состояне
                return {
                    // ...state, // Возвразаем старое состояние
                    // Инициализируем начальные значения
                    ...exchangeForm,
                    // Состояне приложения загрузка - нужно для того, чтобы показать окно загрузки 
                    isLoading: true
                }
            }
            // Запрос инициалиации 
            case "FETCH": {
                // Использую переменные (одна переменная заменяет длинную конструкцию + зрительно понятнее)
                let dataList = action.payload.apiDataList
                // С помощью деконструктора создаю переменные (без постоянного использования data.sale и тд)
                let index = action.payload.index
                // Задаем состояние обьекта
                let data = dataList[index]
                return {
                    // Старое состояние 
                    ...state,
                    apiDataList: dataList,
                    isLoading: false,
                    // Левая карточка
                    left: getLeftCardFromData(data, 1),
                    // Все тоже как и в левой =)
                    right: getRightCardFromData(data, roundUp(1 / (isBuy ? data.buy : data.sale))),
                }
            }
            // Запрос смены типа покупка \ продажа
            case "CHANGE_RATE": {
                if (state.apiDataList.length < 1)
                    return
                let data = state.apiDataList[state.index]
                // Получаем цены 
                let { buy, sale } = data
                // Возвращаем новое состояние
                let leftInputValue = state.left ? state.left.inputValue : '0'
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
        exchangeForm
    )

    // Получаем данные с сервера
    const fetch = async () => {
        // Запрос инициализации 
        dispathExchange({
            type: 'INIT'

        })
        // Получения данных с сервера, использую axios так как нраится
        axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
            // Если есть ответ, то мы вызываем метод полусения нового состояния
            .then(res => dispathExchange({
                type: 'FETCH',
                payload: {
                    apiDataList: res.data,
                    index: 0
                }
            }))
            // Если сервер недоступен
            .catch(() => {
                dispathExchange({
                    type: 'ERROR'
                })
            })
    }

    if (!exchange || exchange.isError) {
        return (
            <>
                <h1>Something wrong...</h1>
                <h2>Pleace check your internet connection =)</h2>
            </>
        )
    }

    if (exchange.isLoading) {
        return (
            <div className="exchange-form-loading">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    return ( // Возвращаеи наш компонент (=
        <div className='exchange-form'>
            <div className='exchange-form-header'>
                Currency converter
            </div>
            <ExchagneOperation onCallbackIsBuy={handleIsBuy}> </ExchagneOperation>
            <select className={'exchange-form-type-ccy'} onChange={handleChangeSelect}>
                {exchange.apiDataList ? exchange.apiDataList.map(item => <option key={item.ccy}>{item.ccy}</option>) : <></>}
            </select>
            <div className='exchange-form-container'>
                <ExchangeItem onHandleInput={handleLeftInput} {...exchange.left} ></ExchangeItem>
                <ExchangeItem onHandleInput={handleRightInput} {...exchange.right}></ExchangeItem>
            </div>
        </div>
    )
}

export default ExchangeForm