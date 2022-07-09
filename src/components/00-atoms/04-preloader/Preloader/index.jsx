import React from "react";
import styles from "./index.module.css";

const Preloader = (props) => {
    const { children } = props;

    return (
        <div className={styles["container"]}>
            <div className={styles["loader"]}></div>;
        </div>
    );
};

export default Preloader;
