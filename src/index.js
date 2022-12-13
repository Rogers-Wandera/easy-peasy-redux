import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {  BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store';
import { StoreProvider } from 'easy-peasy';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
