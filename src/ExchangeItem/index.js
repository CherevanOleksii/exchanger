import { useEffect, useState } from 'react';
import './style.scss'

const ExchangeItem = ({ 
    img, 
    title = '', 
    amount = '1', 
    inputValue = '', 
    mainCurrency = '', 
    currency = '', 
    callbackInput = null 
}) => { // Передаем аргументы в параметры, деконструктор чтобы не использовать входящий параметр "props"

    const [localInputValue, setLocalInputValue] = useState(inputValue) // Хук состояние, храним значение ввода

    useEffect(() => { // Если родитель меняет состояние, то мы обнавляем состояние компонента на состояние родителя
        setLocalInputValue(inputValue)
    }, [inputValue])


    const handleInput = (event) => {
        const val = event.target.value;
        // Если нужно задать ограничение на количество цивр после запятой 
        // const re =/^[0-9]+(?:[\.]|[\.][0-9]{1,4})?$/
        const re =/^[0-9]+(?:[\.]|[\.][0-9]+)?$/ // Регулярное выражение для поиска числа, наш string должен быть СТРОГО ЧИСЛОМ!

        if (val === '' || re.test(val)) { // Проверяем подходит ли нам стоки, если да, то присваеваем новое состояние строки
            setLocalInputValue(val); // Присваеваем значение компонента
            callbackInput(val); // Передаем значение родителю
        }
    }

    return ( // Возвращаем компонент
        <div className='exchange-item'>
            <div className={'exchange-item-left'}>
                <div className='exchange-item-top-container'>
                    <img className='image' src={img}></img>
                    <div className='title'>{title}</div>
                </div>
                <div className='exchange-item-description'>Rate: {amount} {mainCurrency}</div>
                <div className='exchange-item-bot-container'>
                    <input className='exchange-item-input' value={localInputValue} onChange={handleInput}></input>
                    <div className="exchange-item-selected-currency">
                {currency}
            </div>  
                </div>
            </div>
            
        </div>
    )
}

export default ExchangeItem