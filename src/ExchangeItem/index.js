import { useEffect, useState } from 'react';
import './style.scss'

const ExchangeItem = ({ img, title = 'Ukraine', amount = '1', mainCurrency = 'UAN', currency = 'UAN', callbackInput = null }) => {

    const [value, setValue] = useState('')

    useEffect(() => {

    }, [value])

    const handleInput = (event) => {
        const val = event.target.value;
        const re = /^[0-9\b]+$/;

        if (val === '' || re.test(val)) {
            setValue(val);
            callbackInput(val);
        }
    }

    return (

        <div className='exchange-item'>
            <div className={'exchange-item-left'}>
                <div className='exchange-item-top-container'>
                    <img className='image' src={img}></img>
                    <div className='title'>{title}</div>
                </div>

                <div className='exchange-item-description'>Rate: {amount} {mainCurrency}</div>

                <div className='exchange-item-bot-container'>
                    <input className='exchange-item-input' value={value} onChange={handleInput}></input>
                </div>
            </div>
            <div className="exchange-item-selected-currency">
                {currency}
            </div>
        </div>

    )
}

export default ExchangeItem