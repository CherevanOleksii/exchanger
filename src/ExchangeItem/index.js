import { useEffect, useState } from 'react';
import './style.scss'

// Передаем аргументы в параметры, деконструктор чтобы не использовать входящий параметр "props"
const ExchangeItem = ({
    img,
    title = '',
    amount = '1',
    inputValue = '',
    mainCurrency = '',
    currency = '',
    onHandleInput = null
}) => {

    // Хук состояние, храним значение ввода
    const [localInputValue, setLocalInputValue] = useState(inputValue)
    // Если родитель меняет состояние, то мы обнавляем состояние компонента на состояние родителя
    useEffect(() => {
        setLocalInputValue(inputValue)
    }, [inputValue])


    const onInputChange = (event) => {
        const val = event.target.value;
        // Ограничение на количество цифр после запятой 
        // const re =/^[0-9]+(?:[\.]|[\.][0-9]{1,4})?$/
        const re = /^[0-9]+(?:[\.]|[\.][0-9]+)?$/ // Регулярное выражение для поиска числа, наш string должен содержать СТРОГО ЧИСЛО!

        // Проверяем подходит ли нам строка, если да, то присваеваем новое состояние строки
        if (val === '' || re.test(val)) {
            // Присваеваем значение компонента
            setLocalInputValue(val);
            // Передаем значение родителю
            onHandleInput(val);
        }
    }
    // Возвращаем компонент
    return (
        <div className='exchange-item'>
            <div className={'exchange-item-left'}>
                <div className='exchange-item-top-container'>
                    <img className='image' src={img}></img>
                    <div className='title'>{title}</div>
                </div>
                <div className='exchange-item-description'>Rate: {amount} {mainCurrency}</div>
                <div className='exchange-item-bot-container'>
                    <input className='exchange-item-input' value={localInputValue} onChange={onInputChange}></input>
                    <div className="exchange-item-selected-currency">
                        {currency}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExchangeItem