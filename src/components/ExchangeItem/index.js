import { useEffect, useState } from 'react';
import './style.css'


const ExchangeItem = ({
    img,
    title = '',
    amount = '1',
    inputValue = '',
    mainCurrency = '',
    currency = '',
    onHandleInput
}) => {

    
    const [localInputValue, setLocalInputValue] = useState(inputValue)
    
    useEffect(() => {
        setLocalInputValue(inputValue)
    }, [inputValue])


    const onInputChange = (event) => {
        const val = event.target.value;
        
        
        const re = /^[0-9]+(?:[\.]|[\.][0-9]+)?$/ 

        
        if (val === '' || re.test(val)) {
            
            setLocalInputValue(val);
        
            onHandleInput(val);
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