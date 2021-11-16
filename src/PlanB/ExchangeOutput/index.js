import React from "react"

const ExchagneOutput = ({ convertData=[] }) => {


    return (
        <div>
            <h4>Результат</h4>
            {convertData.map(item => 
            <EchangeOutputItem
            
            ></EchangeOutputItem>
            )}
        </div>
    )
}


const EchangeOutputItem = (amount="0.00", price="0.00", typeCurrency='USD') => {

    return (
        <p>
            <input readonly={"readonly"} value={amount} type="text" />
            <span class="_description">{typeCurrency}</span>
            <input readonly={"readonly"} value={price} type="text" />
        </p>
    )
}


export default ExchagneOutput