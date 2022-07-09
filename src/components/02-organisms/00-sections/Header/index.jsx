import LabelCurrency from "components/01-molecules/LabelCurrency";
import React from "react";
import styles from "./index.module.css";

import { useSelector } from "react-redux";
import { useState } from "react";
import { roundUp } from "assets/util";

const Header = (props) => {
    const { children } = props;

    const { currencies } = useSelector((state) => state.currency);

    const [currencyUSD, setCurrencyUSD] = useState(
        currencies.length ? currencies[0] : []
    );
    const [currencyEUR, setCurrencyEUR] = useState(
        currencies.length ? currencies[1] : []
    );

    return (
        <div className={styles["header"]}>
            <div className={styles["prices"]}>
                <div className={styles["help"]}>Buy / Sale</div>
                <LabelCurrency
                    fromCCY={currencyUSD.ccy}
                    toCCY={currencyUSD.base_ccy}
                    fromPrice={roundUp(currencyUSD.buy)}
                    toPrice={roundUp(currencyUSD.sale)}
                ></LabelCurrency>
                <LabelCurrency
                    fromCCY={currencyEUR.ccy}
                    toCCY={currencyEUR.base_ccy}
                    fromPrice={roundUp(currencyEUR.buy)}
                    toPrice={roundUp(currencyEUR.sale)}
                ></LabelCurrency>
            </div>
        </div>
    );
};

export default Header;
