import "./style.css";

import Main from "components/04-pages/Main";
import { fetchPrivatAPI } from "store/currencySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Preloader from "components/00-atoms/04-preloader/Preloader";

const App = () => {
    const dispatcher = useDispatch();
    const { status } = useSelector((store) => store.currency);

    useEffect(() => {
        dispatcher(fetchPrivatAPI());
    }, []);

    if (status === "rejected") {
        return (
            <>
                <h1>Something wrong...</h1>
                <h2>It can happen when you don`t have internet connection</h2>
            </>
        );
    }

    if (status === "pending") {
        return (
            <div className="exchange-form-loading">
              <Preloader/>
            </div>
        );
    }

    return (
        <div className="App">
            <Main></Main>
        </div>
    );
};

export default App;
