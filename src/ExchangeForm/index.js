import './style.scss' //  Загружаем наши стили

import { info, getCCY } from '../assets/extendedCCY' // Методы доп информации (локальные)
import { roundUp, indexContains } from '../assets/util' // Вспомогательные методы (чтобы перенести часть операций в другой файл)

import ExchangeItem from "../ExchangeItem" // Компонент карточки
import ExchagneOperation from '../ExchangeOperation' // Компонент выбора оберации

import { useEffect, useReducer, useState } from 'react' // Реакт хуки
import axios from 'axios' // Библиотека для работы с сервером

const ExchangeForm = () => { // Создаем наш компонент, использую стрелочный синтаксис ибо так удобнее и понятнее
    const staticExchange = { // Заглушка для нашей формы
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
            amount: '',
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

    useEffect(() => { // Код исполняемый при запуске программы (в нашем случае для запроса данных) 
        fetch() // Метод для запроса данных с сервера
    }, []) // В прослуше пусто, следовательно метод не будет повторно выполнятся

    const [isBuy, setIsBuy] = useState(true) //Хук состояния. Название поля глупое, но вполне сгодится, используем для инициализации состояния "Это покупка?" (покупка или не покупка)

    const handleIsBuy = (isBuyValue) => { // Калбек для получения состояния дочернего компонента
        setIsBuy(isBuyValue) // Присваеваем состояние дочернего компонента родителю
    }

    useEffect(() => { // Хук для выполнения кода при изминениях в состоянию "Это покупка?"
        dispathExchange({ // Выполняем запрос
            type: 'CHANGE_RATE', //Тип запроса
        })
    }, [isBuy])

    const handleLeftInput = (value) => { // Обработчик изминений в левой карточке
        dispathExchange({ // Выполняем запрос
            type: 'LEFT_CHANGE', // Тип запроса, у нас это изминения в левой карточке
            payload: { // Передаем состояние 
                inputValue: value // Значение поля ввода левой карточки
            }
        })
    }

    const handleRightInput = (value) => { // Обработчик изминений в правой карточке
        dispathExchange({ // Выполняем запрос
            type: 'RIGHT_CHANGE', // Тип запроса
            payload: { // Передаем состояние
                inputValue: value // Значение поля ввода правой карточки
            }
        })
    }

    const handleChangeSelect = (event) => { // Обрабатываем изминение 
        let name = event.target.value // Исполюзую переменную для хранения значения выбраной валюты

        const index = indexContains(exchange.listCCY, name) // С помощью метода получаем индекс в списке

        dispathExchange({ // Выполняем запрос
            type: "CHANGE_INDEX", // Тип запроса

            payload: { // Передаем запроса
                index: index // Значение индекса
            }
        })

    }


    const exchangeReducer = (state, action) => { // Reducer почему? Ибо нам нужно хранить состояние и использовать повидение

        switch (action.type) { // Определяем тип запроса
            case "INIT": { // Запрос "инициализация" для инициализац
                return { // Обновляем состояне
                    // ...state, // Возвразаем старое состояние
                    ...staticExchange, // Инициализируем начальные значения
                    isLoading: true // Состояне приложения загрузка - нужно для того, чтобы показать окно загрузки 
                }
            }

            case "FETCH": { // Запрос инициалиации 
                let data = action.payload.apiData // Использую переменные (одна переменная заменяет длинную конструкцию + зрительно понятнее)
                let dataList = action.payload.apiDataList 
                let { base_ccy, ccy, buy, sale } = data // С помощью деконструктора создаю переменные (без постоянного использования data.sale и тд)
                let input = 1 // Немного магии, инициализирую значение для суммы в начале

                return { // Задаем состояние обьекта
                    ...state, // Старое состояние 
                    apiData: data, 
                    apiDataList: dataList,
                    isLoading: false,
                    isError: false,
                    listCCY: dataList.map(item => item.ccy), // Задаю список всех валют, использую map для трансформации списка
                    index: 0, // Индекс валют для перевода
                    left: { // Левая карточка
                        img: info(base_ccy).img, // Картинка которую получам из кода валюты
                        title: info(base_ccy).title, // Заголовок который получаем из кода валюты
                        amount: state.left.amount, // Цена валюты по отношению к основной 
                        inputValue: input, // Данные внутри поля ввода
                        mainCurrency: base_ccy, // Основная валюта
                        currency: base_ccy, // Тип валюты (сбоку от ввода)
                    },
                    right: { // Все тоже как и в левой =)
                        img: info(ccy).img, 
                        title: info(ccy).title,
                        amount: roundUp(isBuy ? buy : sale), // Передаем цену покупки или продажи, также округляю число
                        inputValue: roundUp((input / (isBuy ? buy : sale))), // Передаю значение ввода правой карточки
                        mainCurrency: base_ccy, // Значение основной валюты
                        currency: ccy, // Значение валюты
                    }
                }
            }

            case "CHANGE_RATE": { // Запрос смены типа покупка \ продажа
                let { buy, sale } = state.apiData // Получаем цены 

                return { // Возвращаем новое состояние
                    ...state, // Старое состояние, чтобы не переписывать все сначала
                    right: { // Новое состояние
                        ...state.right, // С помощью деконструктора передаем старое значение правой карточки
                        inputValue: roundUp(state.left.inputValue / (isBuy ? buy : sale)), // Новый ввод правой карточки
                        amount: roundUp((isBuy ? buy : sale)), // Новая цена правой карточки
                    }
                }
            }

            case "CHANGE_INDEX": { // Запрос при смене валюьы (индекса)
                let index = action.payload.index // Новый индекс
                let data = state.apiDataList[index] // Информация о новой валюте
                let { base_ccy, ccy, buy, sale } = data // Берем поля новой валюты

                return { // Передаем новое состояние (была мысля чтобы сделать через метод и деконструктор...)
                    ...state, // Дальше как в предыдущих пунктах
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


            case "LEFT_CHANGE": { // Смена ввода в левой карточке 
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

            case "RIGHT_CHANGE": { // Смена ввода в правой карточке
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

            case "ERROR": { // Запрос при ошибке
                console.log('error')
                return {
                    ...state,
                    isError: true // Присваеваем что у нас ошибка (при отсутствии связи с АПИ)
                }
            }
            default:

                return state
        }
    }


    const [exchange, dispathExchange] = useReducer( // Сам хук
        exchangeReducer, // Метод 
        {} // Состояние, у нас внутри метода инициализируется
    )


    const fetch = async () => { // Получаем данные с сервера
        try { // Отлавливаем ошибки
             dispathExchange({ // Запрос инициализации 
                type: 'INIT'
            })

             axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5') // Получения данных с сервера, использую AXIOS так как нраится
                 .then(res => dispathExchange({ // Если есть ответ, то мы вызываем метод полусения нового состояния
                    type: 'FETCH',
                    payload: {
                        apiData: res.data[0],
                        apiDataList: res.data,
                    }
                })
                ).catch(() => { // Если сервер недоступен
                    dispathExchange({
                        type: 'ERROR'
                    })
                })
        } catch (error) {
            dispathExchange({ // Если произойдёт что-то страшное 
                type: 'ERROR'
            })
        }

    }


    return ( // Возвращаеи наш компонент (=
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


                                <select className={'exchange-form-type-ccy'} onChange={handleChangeSelect}>
                                    {exchange.listCCY ? exchange.listCCY.map(item => <option key={item}>{item}</option>) : <></>}
                                </select>

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