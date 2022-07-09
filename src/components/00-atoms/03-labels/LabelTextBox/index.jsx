import React from "react";
import styles from "./index.module.css";

const LabelTextBox = (props) => {
    const { children, text, delimetr="/"  } = props;

    return (
        <span className={styles["label"]}>
           {text}
        </span>
    );
};

export default LabelTextBox;
