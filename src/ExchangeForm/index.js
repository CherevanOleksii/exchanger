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
const ExchangeForm = ({ exchangeForm = {
    index: 0,
    apiData: {},
    apiDataList: [],
    listCCY: [],
    inputValue: 0,
    isLoading: false,
    isError: false,
    left: {
        img: null,
        title: '',
        amount: '1',
        inputValue: '',
        mainCurrency: '',
        currency: '',
    },
    right: {
        img: null,
        title: '',
        amount: '',
        inputValue: '',
        mainCurrency: '',
        currency: '',
    }
} }) => {

    // Код исполняемый при запуске программы (в нашем случае для запроса данных) 
    // Метод для запроса данных с сервера
    // В прослуше пусто, следовательно метод не будет повторно выполнятся 
    useEffect(() => {

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
        const index = indexContains(exchange.listCCY, name) 

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
                let data = action.payload.apiData 
                let dataList = action.payload.apiDataList
                // С помощью деконструктора создаю переменные (без постоянного использования data.sale и тд)
                let { base_ccy, ccy, buy, sale } = data 
                // Немного магии, инициализирую значение для суммы в начале
                let input = 1 

                // Задаем состояние обьекта
                return { 
                    // Старое состояние 
                    ...state, 
                    apiData: data,
                    apiDataList: dataList,
                    isLoading: false,
                    isError: false,
                    // Задаю список всех валют, использую map для трансформации списка
                    listCCY: dataList.map(item => item.ccy), 
                    // Индекс валют для перевода
                    index: 0, 
                    // Левая карточка
                    left: { 
                        // Картинка которую получам из кода валюты
                        img: info(base_ccy).img, 
                        // Заголовок который получаем из кода валюты
                        title: info(base_ccy).title, 
                        // Цена валюты по отношению к основной 
                        amount: state.left.amount, 
                        // Данные внутри поля ввода
                        inputValue: input, 
                        // Основная валюта
                        mainCurrency: base_ccy, 
                        // Тип валюты (сбоку от ввода)
                        currency: base_ccy, 
                    },
                    // Все тоже как и в левой =)
                    right: { 
                        img: info(ccy).img,
                        title: info(ccy).title,
                        // Передаем цену покупки или продажи, также округляю число
                        amount: roundUp(isBuy ? buy : sale), 
                        // Передаю значение ввода правой карточки
                        inputValue: roundUp((input / (isBuy ? buy : sale))), 
                        // Значение основной валюты
                        mainCurrency: base_ccy, 
                        // Значение валюты
                        currency: ccy, 
                    }
                }
            }
            // Запрос смены типа покупка \ продажа
            case "CHANGE_RATE": { 
                // Получаем цены 
                let { buy, sale } = state.apiData 

                // Возвращаем новое состояние
                return { 
                    // Старое состояние, чтобы не переписывать все сначала
                    ...state, 
                    // Новое состояние
                    right: { 
                        // С помощью деконструктора передаем старое значение правой карточки
                        ...state.right, 
                        // Новый ввод правой карточки
                        inputValue: roundUp(state.left.inputValue / (isBuy ? buy : sale)), 
                        // Новая цена правой карточки
                        amount: roundUp((isBuy ? buy : sale)), 
                    }
                }
            }
            // Запрос при смене валюьы (индекса)
            case "CHANGE_INDEX": { 
                // Новый индекс
                let index = action.payload.index 
                // Информация о новой валюте
                let data = state.apiDataList[index] 
                // Берем поля новой валюты
                let { base_ccy, ccy, buy, sale } = data 

                // Передаем новое состояние (была мысля чтобы сделать через метод и деконструктор...)
                return { 
                    // Дальше как в предыдущих пунктах
                    ...state, 
                    index: index,
                    apiData: data,
                    left: {
                        img: info(base_ccy).img,
                        title: info(base_ccy).title,
                        amount: state.left.amount,
                        inputValue: state.left.inputValue,
                        mainCurrency: base_ccy,
                        currency: base_ccy,
                    },
                    right: {
                        img: info(ccy).img,
                        title: info(ccy).title,
                        amount: roundUp((isBuy ? buy : sale)),
                        inputValue: roundUp((state.left.inputValue / (isBuy ? buy : sale))),
                        mainCurrency: base_ccy,
                        currency: ccy,
                    }
                }
            }
            case "LEFT_CHANGE": { 
                // Смена ввода в левой карточке 
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
                // Смена ввода в правой карточке
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
        // Получения данных с сервера, использую AXIOS так как нраится
        axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
            // Если есть ответ, то мы вызываем метод полусения нового состояния
            .then(res => dispathExchange({
                type: 'FETCH',
                payload: {
                    apiData: res.data[0],
                    apiDataList: res.data,
                }
            }))
            // Если сервер недоступен
            .catch(() => {
                dispathExchange({
                    type: 'ERROR'
                })
            })
    }

    if (exchange.isError) {
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
            <ExchagneOperation onHandleIsBuy={handleIsBuy}> </ExchagneOperation>
            <select className={'exchange-form-type-ccy'} onChange={handleChangeSelect}>
                {exchange.listCCY ? exchange.listCCY.map(item => <option key={item}>{item}</option>) : <></>}
            </select>
            <div className='exchange-form-container'>
                <ExchangeItem onHandleInput={handleLeftInput} {...exchange.left} ></ExchangeItem>
                <ExchangeItem onHandleInput={handleRightInput} {...exchange.right}></ExchangeItem>
            </div>
        </div>
    )
}

export default ExchangeForm