import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/index';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Suspense>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
