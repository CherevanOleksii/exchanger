import { useState } from "react";

const ExchagneInput = ({ data, callbackChangeCurrencyAmount }) => {

    const [currencyAmount, setCurencyAmount] = useState('')

    const handleChange = (event) => {
        const val = event.target.value;
        const re = /^[0-9\b]+$/;
        
        if (val === '' || re.test(val)) {
            setCurencyAmount(val);
        }

        callbackChangeCurrencyAmount(event.target.value)
    }


    return (
        <>
            <label>Сумму: </label>
            <input
                placeholder="amount"
                onChange={handleChange}
                value={currencyAmount}
            />
            <select>
                {data.map(item =>
                    <option key={item.ccy + item.base_ccy}>{item.ccy}</option>
                )}
            </select>
        </>)
}

export default ExchagneInput