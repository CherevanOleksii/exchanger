import './App.css';

import { useEffect, useReducer, useRef, useState } from 'react';

import ExchangeForm from './ExchangeForm'

const App = () => {
  return (
    <div className="App">
      <ExchangeForm isOffline={false}></ExchangeForm>
    </div>
  );
}


export default App;
