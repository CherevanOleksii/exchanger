import React from "react";
import styles from "./index.module.css";

import TMain from "components/03-templates/TMain";

const Main = (props) => {
    const { children } = props;

    return (
        <div className={styles[""]}>
            <TMain></TMain>
        </div>
    );
};

export default Main;
