import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./index.module.css";

const TextBox = (props) => {
    const {
        children,
        type = "text",
        text = "text",
        value = "",
        placeholder = "0",
        onChange,
        onBlur,
    } = props;

    const [innerText, setInnerText] = useState(value ?? "");

    const handleChange = (e) => {
        const text = e.target.value;

        setInnerText(text);
        onChange(text);
    };

    useEffect(() => {}, []);

    return (
        <div className={styles["text-box"]}>
            <input
                className={styles["input"]}
                value={value || innerText}
                type={type}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={handleChange}
            ></input>

            <div className={styles["text"]}>{text}</div>
        </div>
    );
};

export default TextBox;
