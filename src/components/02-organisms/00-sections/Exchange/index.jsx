import { roundUp } from "assets/util";
import SelectOperation from "components/01-molecules/SelectOperation";
import ExchangeCard from "components/02-organisms/01-cards/ExchangeCard";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

const getUniqueElements = (currencies, mapFunc) => {
    return currencies.map(mapFunc).filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
};

const getReverseCurrency = (currencies, ccy, base_ccy) => {
    let foundCurrency = currencies.filter(
        (_currency) => _currency.ccy === base_ccy && _currency.base_ccy === ccy
    );

    return foundCurrency[0];
};

const getCorrectCurrency = (currencies, oldCurrency, newCurrency) => {
    const { ccy, base_ccy } = newCurrency;
    const { ccy: old_ccy, base_ccy: old_base_ccy } = oldCurrency;

    let correctCurrency;

    if (ccy === base_ccy) {
        correctCurrency = getReverseCurrency(currencies, old_ccy, old_base_ccy);
    }

    if (!correctCurrency) {
        correctCurrency = currencies.filter(
            (currency) => currency.ccy === ccy && currency.base_ccy === base_ccy
        )[0];
    }

    return correctCurrency;
};

const CURRENCIES = [
    { ccy: "USD", base_ccy: "UAH", buy: "35.50000", sale: "35.90000" },
    { ccy: "EUR", base_ccy: "UAH", buy: "35.70000", sale: "37.20000" },
    { ccy: "BTC", base_ccy: "USD", buy: "20506.3576", sale: "22664.9216" },
];

const Exchanger = (props) => {
    const { children } = props;

    const { currencies } = useSelector((state) =>  { 
        console.log(state);
        return state.currency });

    const [isBuy, setIsBuy] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies.length ? currencies[0] : {});

    const [amountLeft, setAmountLeft] = useState(0);
    const [amountRight, setAmountRight] = useState(0);

    const calcAmountRight = (
        amount = amountLeft,
        currency = selectedCurrency
    ) => (isBuy ? amount * currency.buy : amount * currency.sale);

    const calcAmountLeft = (
        amount = amountRight,
        currency = selectedCurrency
    ) => (isBuy ? amount / currency.buy : amount / currency.sale);

    const hadleBuySaleChange = (isBuy) => {
        setIsBuy(isBuy);

        let newAmountRight = calcAmountRight();
        newAmountRight = roundUp(newAmountRight);
        setAmountRight(newAmountRight);
    };

    const handleSelectedCCY = (selected) => {
        const ccy = selected;
        const base_ccy = selectedCurrency.base_ccy;

        let correctCurrency = getCorrectCurrency(currencies, selectedCurrency, {
            ccy,
            base_ccy,
        });

        setSelectedCurrency(correctCurrency);

        let newAmountRight = calcAmountRight(amountLeft, correctCurrency);
        newAmountRight = roundUp(newAmountRight);
        setAmountRight(newAmountRight);
    };

    const handleSelectedBaseCCY = (selected) => {
        const base_ccy = selected;
        const ccy = selectedCurrency.ccy;

        let correctCurrency =
            getCorrectCurrency(currencies, selectedCurrency, {
                ccy,
                base_ccy,
            }) || selectedCurrency;

        setSelectedCurrency(correctCurrency);

        let newAmountRight = calcAmountLeft(amountRight, correctCurrency);
        newAmountRight = roundUp(newAmountRight);
        setAmountLeft(newAmountRight);
    };

    const handleAmountChangeLeft = (amount) => {
        let newAmountRight = calcAmountRight(amount);
        newAmountRight = roundUp(newAmountRight);
        setAmountRight(newAmountRight);
        setAmountLeft(amount);
    };

    const handleAmountChangeRight = (amount) => {
        let newAmountLeft = calcAmountLeft(amount);
        newAmountLeft = roundUp(newAmountLeft);
        setAmountLeft(newAmountLeft);
        setAmountRight(amount);
    };

    return (
        <div className={styles["section"]}>
            <SelectOperation onChange={hadleBuySaleChange}></SelectOperation>

            <ExchangeCard
                onChangeCurrency={handleSelectedCCY}
                onChangeAmount={handleAmountChangeLeft}
                ccy={selectedCurrency.ccy}
                amount={amountLeft}
                currencies={getUniqueElements(
                    currencies,
                    (currency) => currency.ccy
                )}
            ></ExchangeCard>

            <ExchangeCard
                onChangeCurrency={handleSelectedBaseCCY}
                onChangeAmount={handleAmountChangeRight}
                amount={amountRight}
                ccy={selectedCurrency.base_ccy}
                currencies={getUniqueElements(
                    currencies,
                    (currency) => currency.base_ccy
                )}
            ></ExchangeCard>
        </div>
    );
};

export default Exchanger;
