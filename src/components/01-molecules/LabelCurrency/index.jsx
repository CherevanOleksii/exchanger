import LabelDelimetr from "components/00-atoms/03-labels/LabelCurrency";
import React from "react";
import styles from "./index.module.css";

const LabelCurrency = (props) => {
    const { children, fromCCY = "USD", toCCY = "UAH", fromPrice ="35.8", toPrice="34.3" } = props;

    return (
        <label className={styles["label"]}>
            <LabelDelimetr textLeft={fromCCY} textRight={toCCY}></LabelDelimetr>
               
            <span className={styles["label__price"]}>
                {fromPrice} / {toPrice}
            </span>
        </label>
    );
};

export default LabelCurrency;
