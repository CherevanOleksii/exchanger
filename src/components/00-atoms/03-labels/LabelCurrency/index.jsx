import React from "react";
import styles from "./index.module.css";

const LabelDelimetr = (props) => {
    const { children, textRight, textLeft, delimetr="/"  } = props;

    return (
        <span className={styles["label"]}>
            {textLeft}{delimetr} <span className={styles["right"]}>{textRight}</span>
        </span>
    );
};

export default LabelDelimetr;
