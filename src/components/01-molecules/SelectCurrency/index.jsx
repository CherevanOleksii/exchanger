import React, { useState } from "react";
import styles from "./index.module.css";
import ButtonSwitch from "components/00-atoms/01-buttons/ButtonSwitch";
import LabelDelimetr from "components/00-atoms/03-labels/LabelCurrency";
import Button from "components/00-atoms/01-buttons/Button";
import { findIndexOption as findOption } from "assets/util";
import { useRef } from "react";
import { useEffect } from "react";

const SelectCurrency = (props) => {
    const { children, currencies = [], value ="", onChange = () => {} } = props;

    const handleChange = (event) => {
        const option = findOption(currencies, event);
        onChange(option.text);
    };


    useEffect(() => {
    }, [])
    return (
        <select
            className={styles["select-operation"]}
            onChange={(e) => handleChange(e)}
        >
            {currencies.map((currency) => (
                <option key={currency} selected={value === currency}>{currency}</option>
            ))}
        </select>
    );
};

export default SelectCurrency;
