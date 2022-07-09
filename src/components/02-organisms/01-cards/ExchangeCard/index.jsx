import { ImageFromCCY } from "assets/util_CCY";
import SelectCurrency from "components/01-molecules/SelectCurrency";
import TextBoxWithLabel from "components/01-molecules/TextBoxWithLabel";
import React from "react";
import styles from "./index.module.css";


const ExchangeCard = (props) => {
    const { children, currencies=[], ccy = "UAH", amount = 0, onChangeCurrency = () => {}, onChangeAmount = () => {}} = props;

    const handleChange = (text) => {
        onChangeCurrency(text);
    }
    const handleChangeText = (text) => {
        onChangeAmount(text);
    }
    return (
        <div className={styles["card"]}>
            <div className={styles["meta"]}>
                <img className={styles["flag"]} src={ImageFromCCY[ccy].image} alt={ImageFromCCY[ccy].title}></img>
                <SelectCurrency value={ccy} currencies={currencies} onChange={handleChange}></SelectCurrency>
            </div>

            <TextBoxWithLabel value={amount} text="Amount" onChange={handleChangeText} ccyName={ccy}></TextBoxWithLabel>
        </div>
    );
};

export default ExchangeCard;
