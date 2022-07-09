import Header from "components/02-organisms/00-sections/Header";
import Header1 from "components/00-atoms/02-headers/Header1";
import Exchanger from "components/02-organisms/00-sections/Exchange";
import React from "react";
import styles from "./index.module.css";

const TMain = (props) => {
    const { children } = props;

    return (
        <div className={styles["block"]}>
            <Header></Header>
            
            <div className={styles["content"]}>
                <Header1>Currency exchange</Header1>
                <Exchanger></Exchanger>
            </div>
        </div>
    );
};

export default TMain;
