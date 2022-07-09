import React from "react";
import styles from "./index.module.css";

const Button = (props) => {
    const { children , text="text" , onClick = () => {} } = props;



    return (
        <button className={styles["button"]} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
