import "./style.css";

import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";

import ExchangeForm from "components/ExchangeForm";
import { staticAPI } from "assets/mock_data";
import Main from "components/04-pages/Main";

const App = ({
    isLoading = false,
    isError = false,
    isOffline = false,

    apiData = staticAPI,
}) => {
    const initExchangeAppState = {
        isLoading,
        isError,
        isOffline,
        apiData,
    };

    useEffect(() => {
        if (!initExchangeAppState.isOffline) fetchExchangeData();
    }, []);

    const exchangeAppReducer = (state, action) => {
        switch (action.type) {
            case "INIT": {
                return {
                    ...state,
                    isLoading: true,
                };
            }

            case "FETCH": {
                let dataList = action.payload.apiDataList;
                return {
                    ...state,
                    isLoading: false,
                    apiData: dataList,
                };
            }
            case "ERROR": {
                return {
                    ...state,
                    isError: true,
                };
            }
        }
    };

    const fetchExchangeData = async () => {
        dispatchExchangeApp({
            type: "INIT",
        });

        axios
            .get(
                "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
            )
            .then((res) =>
                dispatchExchangeApp({
                    type: "FETCH",
                    payload: {
                        apiDataList: res.data,
                    },
                })
            )
            .catch(() => {
                dispatchExchangeApp({
                    type: "ERROR",
                });
            });
    };

    const [exchangeApp, dispatchExchangeApp] = useReducer(
        exchangeAppReducer,
        initExchangeAppState
    );

    if (exchangeApp.isError) {
        return (
            <>
                <h1>Something wrong...</h1>
                <h2>It can happen when you don`t have internet connection</h2>
            </>
        );
    }

    if (exchangeApp.isLoading) {
        return (
            <div className="exchange-form-loading">
                {/* <Spinner animation="border" variant="primary" /> */}
            </div>
        );
    }

    return (
        <div className="App">
            <Main></Main>
            <ExchangeForm dataList={exchangeApp.apiData}></ExchangeForm>
        </div>
    );
};

export default App;
