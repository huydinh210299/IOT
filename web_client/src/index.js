import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/index';
import { Spin } from 'antd';
//import appReducer from './redux/reducers/index';
import thunk from 'redux-thunk';
// var startState = {};
// if (
//     localStorage.getItem("token") !== null &&
//     localStorage.getItem("token") !== "null"
// ) {
//     startState = {
//         auth: {
//             token: localStorage.getItem("token"),
//             isAuthenticated: true,
//         },
//     };
// } else {
//     startState = {
//         auth: {
//             token: null,
//             isAuthenticated: false,
//         },
//     };
// }

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT_SUCCESS') {
//       state = undefined;
//     }

//     return appReducer(state, action);
//   };
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
  localStorage.setItem('token', store.getState().authReducer.token);
});

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spin tip="Loading..." size="large"></Spin>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
