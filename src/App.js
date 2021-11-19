import './App.css';

import { useEffect, useReducer, useRef, useState } from 'react';

import ExchangeForm from './ExchangeForm'

const App = () => {
  const staticAPI = [
    {"ccy":"USD","base_ccy":"UAH","buy":"26.40000","sale":"26.66667"},
    {"ccy":"EUR","base_ccy":"UAH","buy":"29.85000","sale":"30.30303"},
    {"ccy":"RUR","base_ccy":"UAH","buy":"0.35000","sale":"0.38000"},
    {"ccy":"BTC","base_ccy":"USD","buy":"54141.1403","sale":"59840.2077"}]
  return (
    <div className="App">
      <ExchangeForm></ExchangeForm>
    </div>
  );
}


export default App;
