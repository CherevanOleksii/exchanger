import TextBox from "components/00-atoms/00-text-boxes/TextBox";
import LabelTextBox from "components/00-atoms/03-labels/LabelTextBox";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./index.module.css";

const TextBoxWithLabel = (props) => {
    const {
        children,
        text,
        ccyName,
        value,
        onChange = () => {},
    } = props;

    const [innerText, setInnerText] = useState(value);

    const handleChange = (text) => {
        setInnerText(text);
    };


    useEffect(() => {
        onChange(innerText);
    }, [innerText]);


    return (
        <div className={styles["text-box"]}>
            <LabelTextBox text={text}></LabelTextBox>

            <TextBox
                type="number"
                value={value || ""}
                text={ccyName}
                onChange={handleChange}
            ></TextBox>
        </div>
    );
};

export default TextBoxWithLabel;
