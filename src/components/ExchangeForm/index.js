import "./style.css";

import React from "react";
import { getInfoFromCCY, getListCCY } from "assets/util_CCY";
import { roundUp, indexContains } from "assets/util";
import ExchangeItem from "components/ExchangeItem";
import ExchagneOperation from "components/ExchangeOperation";
import { useEffect, useReducer, useState } from "react";

const ExchangeForm = ({ dataList = [] }) => {
    const getInitialState = (inIndex = 0, leftInputValue = "") => {
        let item = {
            apiDataList: dataList,
            index: inIndex,
            left: {
                img: "",
                title: "",
                amount: "",
                inputValue: leftInputValue,
                mainCurrency: "",
                currency: "",
            },
            right: {
                img: "",
                title: "",
                amount: "",
                inputValue: "",
                mainCurrency: "",
                currency: "",
            },
        };

        console.log(item);
        return item;
    };

    const [isBuy, setIsBuy] = useState(true);

    const handleIsBuy = (isBuyValue) => {
        setIsBuy(isBuyValue);
    };

    useEffect(() => {
        dispathExchange({
            type: "CHANGE_RATE",
        });
    }, [isBuy]);

    const handleLeftInput = (value) => {
        localStorage.setItem("leftInputValue", value);
        dispathExchange({
            type: "LEFT_CHANGE",

            payload: {
                inputValue: value,
            },
        });
    };

    const handleRightInput = (value) => {
        dispathExchange({
            type: "RIGHT_CHANGE",

            payload: {
                inputValue: value,
            },
        });
    };

    const handleChangeSelect = (event) => {
        let name = event.target.value;

        const index = indexContains(getListCCY(exchange.apiDataList), name);

        dispathExchange({
            type: "CHANGE_INDEX",

            payload: {
                index: index,
            },
        });
    };

    const getLeftCardFromData = (data, leftInput = 1) => {
        let { base_ccy } = data;
        return {
            img: getInfoFromCCY(base_ccy).img,
            title: getInfoFromCCY(base_ccy).title,
            amount: 1,
            inputValue: leftInput,
            mainCurrency: base_ccy,
            currency: base_ccy,
        };
    };

    const getRightCardFromData = (data, rightInput = 1) => {
        let { base_ccy, ccy, buy, sale } = data;
        return {
            img: getInfoFromCCY(ccy).img,
            title: getInfoFromCCY(ccy).title,

            amount: roundUp(isBuy ? buy : sale),

            inputValue: rightInput,

            mainCurrency: base_ccy,

            currency: ccy,
        };
    };

    const exchangeReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_RATE": {
                if (state.apiDataList.length < 1) return;
                console.log(state.apiDataList);
                console.log(state.index);
                let data = state.apiDataList[state.index];

                let { buy, sale } = data;

                let leftInputValue = state.left.inputValue
                    ? state.left.inputValue
                    : "1";
                return {
                    ...state,

                    left: getLeftCardFromData(data, leftInputValue),
                    right: getRightCardFromData(
                        data,
                        roundUp(leftInputValue / (isBuy ? buy : sale))
                    ),
                };
            }

            case "CHANGE_INDEX": {
                let index = action.payload.index;

                localStorage.setItem("index", index);

                let data = state.apiDataList[index];

                let { buy, sale } = data;

                return {
                    ...state,
                    index: index,
                    left: getLeftCardFromData(data, state.left.inputValue),
                    right: getRightCardFromData(
                        data,
                        roundUp(state.left.inputValue / (isBuy ? buy : sale))
                    ),
                };
            }
            case "LEFT_CHANGE": {
                let input = action.payload.inputValue;
                let data = state.apiDataList[state.index];
                let { buy, sale } = data;
                return {
                    ...state,
                    left: getLeftCardFromData(data, input),
                    right: getRightCardFromData(
                        data,
                        roundUp(input / (isBuy ? buy : sale))
                    ),
                };
            }
            case "RIGHT_CHANGE": {
                let input = action.payload.inputValue;
                let data = state.apiDataList[state.index];
                let { buy, sale } = data;
                return {
                    ...state,
                    left: getLeftCardFromData(
                        data,
                        roundUp(input * (isBuy ? buy : sale))
                    ),
                    right: getRightCardFromData(data, input),
                };
            }
            case "ERROR": {
                return {
                    ...state,
                    isError: true,
                };
            }
            default:
                return state;
        }
    };

    const [exchange, dispathExchange] = useReducer(
        exchangeReducer,

        getInitialState(
            localStorage.getItem("index") || 0,
            localStorage.getItem("leftInputValue") || 1
        )
    );

    useEffect(() => {
        localStorage.setItem("leftInputValue", exchange.left.inputValue);
    }, [exchange]);

    return (
        <div className="exchange-form">
            <div className="exchange-form-header">Currency converter</div>
            <ExchagneOperation onCallbackIsBuy={handleIsBuy}>
                {" "}
            </ExchagneOperation>
            <select
                className={"exchange-form-type-ccy"}
                defaultValue={getListCCY(exchange.apiDataList)[exchange.index]}
                onChange={handleChangeSelect}
            >
                {exchange.apiDataList ? (
                    getListCCY(exchange.apiDataList).map((ccy) => (
                        <option key={ccy}>{ccy}</option>
                    ))
                ) : (
                    <></>
                )}
            </select>
            <div className="exchange-form-container">
                <ExchangeItem
                    onHandleInput={handleLeftInput}
                    {...exchange.left}
                ></ExchangeItem>
                <ExchangeItem
                    onHandleInput={handleRightInput}
                    {...exchange.right}
                ></ExchangeItem>
            </div>
        </div>
    );
};

export default ExchangeForm;
