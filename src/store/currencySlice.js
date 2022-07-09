import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const necessaryCCY = ["UAH", "USD", "EUR"];

const getNecesseryCurrencies = (currencies) => {
    // purpose of this method is make a valid API for our application from PrivatAPI
    // this is necessary because PrivatApi haven`t enough information and returns only basic.
    const correctCurrencies = currencies.filter((currency) => {
        const isCorrectCCY = necessaryCCY.filter(
            (ccy) => ccy === currency.ccy
        ).length;

        const isCorrectBaseCCY = necessaryCCY.filter(
            (ccy) => ccy === currency.base_ccy
        ).length;

        const isAllCorrect = !!isCorrectCCY && !!isCorrectBaseCCY;

        if (isAllCorrect) {
            return currency;
        }
    });

    const usdToUahCurrency = currencies.filter(
        (currency) => currency.ccy === "USD" && currency.base_ccy === "UAH"
    )[0];
    const eurToUahCurrency = currencies.filter(
        (currency) => currency.ccy === "EUR" && currency.base_ccy === "UAH"
    )[0];

    const euroToDollar = {
        ccy: "USD",
        base_ccy: "EUR",
        buy: usdToUahCurrency.buy / eurToUahCurrency.buy,
        sale: usdToUahCurrency.sale / eurToUahCurrency.sale,
    };

    correctCurrencies.push(euroToDollar);

    return correctCurrencies;
};

const getReverseExchange = (currencies) => {
    const necessaryCurrencies = getNecesseryCurrencies(currencies);

    const baseReverseCurrencies = necessaryCurrencies.map((currency) => {
        const reverseCurrency = {};
        reverseCurrency.ccy = currency.base_ccy;
        reverseCurrency.base_ccy = currency.ccy;
        reverseCurrency.buy = 1 / currency.buy;
        reverseCurrency.sale = 1 / currency.sale;
        return reverseCurrency;
    });

    const fullCurrencies = [...necessaryCurrencies, ...baseReverseCurrencies];
    return fullCurrencies;
};

const fetchPrivatAPI = createAsyncThunk(
    "currency/fetchPrivatAPI",
    async function () {
        const response = await axios(
            "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
        ).then((res) => res);

        const correctCurrencies = getReverseExchange(response.data);

        return correctCurrencies;
    }
);

const initialState = {
    status: "",
    currencies: [],
};

export const counterSlice = createSlice({
    name: "currency",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPrivatAPI.pending]: (state) => {
            state.status = "pending";
        },

        [fetchPrivatAPI.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.currencies = action.payload;
        },

        [fetchPrivatAPI.rejected]: (state, action) => {
            state.status = "rejected";
            state.currencies = action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export { fetchPrivatAPI };
export default counterSlice.reducer;
