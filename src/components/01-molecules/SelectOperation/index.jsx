import React, { useState } from "react";
import styles from "./index.module.css";
import ButtonSwitch from "components/00-atoms/01-buttons/ButtonSwitch";
import LabelDelimetr from "components/00-atoms/03-labels/LabelCurrency";
import Button from "components/00-atoms/01-buttons/Button";
import { useEffect } from "react";

const stateSell = {
    textLeft: "SELL",
    textRight: "BUY",
};
const stateBuy = {
    textLeft: "BUY",
    textRight: "SELL",
};

const SelectOperation = (props) => {
    const { children, onChange } = props;

    const [isSell, setIsSell] = useState(false);
    const [state, setState] = useState(stateBuy)


    const handleChange = (e) => {
        const newIsSell = !isSell
        
        setIsSell(newIsSell)
        setState(newIsSell ? stateSell : stateBuy)
    };

    useEffect(() => {
        onChange(isSell);
    }, [isSell])

    return (
        <div className={styles["select-operation"]}>
            <LabelDelimetr {...state}></LabelDelimetr>

            <Button onClick={handleChange} text={state.textRight}></Button>
        </div>
    );
};

export default SelectOperation;
