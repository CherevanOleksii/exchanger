import React from "react";
import styles from "./index.module.css";

const Header1 = (props) => {
    const { children, text = "Header1" } = props;

    return <h1 className={styles["header"]}>{children || text}</h1>;
};

export default Header1;
