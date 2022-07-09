import { roundUp } from "assets/util";
import SelectOperation from "components/01-molecules/SelectOperation";
import ExchangeCard from "components/02-organisms/01-cards/ExchangeCard";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./index.module.css";

const necessaryCCY = ["UAH", "USD", "EUR"];

const getNecesseryCurrencies = (currencies) => {
    // purpose of this method is make a valid API for our application from PrivatAPI
    // this is necessary because PrivatApi haven`t enough information and returns only basic.
    const correctCurrencies = currencies.filter((currency) => {
        const isCorrectCCY = necessaryCCY.filter(
            (ccy) => ccy === currency.ccy
        ).length;

        const isCorrectBaseCCY = necessaryCCY.filter(
            (ccy) => ccy === currency.base_ccy
        ).length;

        const isAllCorrect = !!isCorrectCCY && !!isCorrectBaseCCY;

        if (isAllCorrect) {
            return currency;
        }
    });

    const usdToUahCurrency = currencies.filter(
        (currency) => currency.ccy === "USD" && currency.base_ccy === "UAH"
    )[0];
    const eurToUahCurrency = currencies.filter(
        (currency) => currency.ccy === "EUR" && currency.base_ccy === "UAH"
    )[0];

    const euroToDollar = {
        ccy: "USD",
        base_ccy: "EUR",
        buy: usdToUahCurrency.buy / eurToUahCurrency.buy,
        sale: usdToUahCurrency.sale / eurToUahCurrency.sale,
    };

    correctCurrencies.push(euroToDollar);

    return correctCurrencies;
};

const getReverseExchange = (currencies) => {
    const necessaryCurrencies = getNecesseryCurrencies(currencies);

    const baseReverseCurrencies = necessaryCurrencies.map((currency) => {
        const reverseCurrency = {};
        reverseCurrency.ccy = currency.base_ccy;
        reverseCurrency.base_ccy = currency.ccy;
        reverseCurrency.buy = 1 / currency.buy;
        reverseCurrency.sale = 1 / currency.sale;
        return reverseCurrency;
    });

    const fullCurrencies = [...necessaryCurrencies, ...baseReverseCurrencies];
    return fullCurrencies;
};

const getUniqueElements = (currencies, mapFunc) => {
    return currencies.map(mapFunc).filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
};

const getCorrectCurrency = (currencies, ccy, base_ccy) =>
    currencies.find((currency) =>
        ccy === base_ccy
            ? currency.ccy === ccy
            : currency.ccy === ccy && currency.base_ccy === base_ccy
    );

const CURRENCIES = [
    { ccy: "USD", base_ccy: "UAH", buy: "35.50000", sale: "35.90000" },
    { ccy: "EUR", base_ccy: "UAH", buy: "35.70000", sale: "37.20000" },
    { ccy: "BTC", base_ccy: "USD", buy: "20506.3576", sale: "22664.9216" },
];

const Exchanger = (props) => {
    const { children } = props;

    const currencies = getReverseExchange(CURRENCIES);

    const [isBuy, setIsBuy] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

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

        const correctCurrency = getCorrectCurrency(currencies, ccy, base_ccy);

        setSelectedCurrency(correctCurrency || selectedCurrency);
    };

    const handleSelectedBaseCCY = (selected) => {
        const base_ccy = selected;
        const ccy = selectedCurrency.ccy;

        const correctCurrency = getCorrectCurrency(currencies, ccy, base_ccy);

        setSelectedCurrency(correctCurrency || selectedCurrency);
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

    useEffect(() => {
        let newAmountRight = calcAmountRight();
        newAmountRight = roundUp(newAmountRight);
        setAmountRight(newAmountRight);
    }, [selectedCurrency]);
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
