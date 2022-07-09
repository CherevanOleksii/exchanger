import "./style.css";

import Main from "components/04-pages/Main";
import { fetchPrivatAPI } from "store/currencySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {

        // const res = await fetch("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
        //     .then((res) => res.json())
        //     .then((data) => data);
            
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
                {/* <Spinner animation="border" variant="primary" /> */}
                <h2>Loading</h2>
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
