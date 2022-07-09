import SelectCurrency from "components/01-molecules/SelectCurrency";
import TextBoxWithLabel from "components/01-molecules/TextBoxWithLabel";
import React from "react";
import styles from "./index.module.css";


const ExchangeCard = (props) => {
    const { children, currencies=[], ccy = "UAH", amount = "", onChangeCurrency = () => {}, onChangeAmount = () => {}} = props;

    const handleChange = (text) => {
        onChangeCurrency(text);
    }
    const handleChangeText = (text) => {
        onChangeAmount(text);
    }
    return (
        <div className={styles["card"]}>
            <div className={styles["meta"]}>
                {/* <img className={styles["flag"]} src={""}></img> */}
                {ccy}
                <SelectCurrency value={ccy} currencies={currencies} onChange={handleChange}></SelectCurrency>
            </div>

            <TextBoxWithLabel value={amount} text="Amount" onChange={handleChangeText} ccyName={ccy}></TextBoxWithLabel>
        </div>
    );
};

export default ExchangeCard;
