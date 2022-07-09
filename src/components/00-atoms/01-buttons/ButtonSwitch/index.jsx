import React, { useRef } from "react";
import { useState } from "react";
import Button from "../Button";
import styles from "./index.module.css";

const defaultState = false;
const ButtonSwitch = (props) => {
    const { children, onClick = () => {} } = props;

    const [isActive, setIsActive] = useState(defaultState);

    const onHandleClick = (e) => {
        const newState = !isActive;

        onClick(e, newState);
        setIsActive(newState);
    };

    return (
        <label className={styles["switch"]}>
            <input type="checkbox" onChange={onHandleClick} />
            <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
    );
};

export default ButtonSwitch;
