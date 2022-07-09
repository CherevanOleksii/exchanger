import LabelCurrency from "components/01-molecules/LabelCurrency";
import React from "react";
import styles from "./index.module.css";

const Header = (props) => {
    const { children } = props;

    return (
        <div className={styles["header"]}>
            <div className={styles["prices"]}>
                <LabelCurrency></LabelCurrency>
                <LabelCurrency></LabelCurrency>
            </div>
        </div>
    );
};

export default Header;
