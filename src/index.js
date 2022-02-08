import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import Modal from 'react-modal';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { requestMiddleware } from './helpers/redux-request';
import reducer from './store/reducers/index';
import './assets/styles/main.scss';
import './assets/styles/clientMenu.scss';
import './assets/styles/restaurant.scss';
import './assets/styles/aboutUs.scss';
import './assets/styles/contactUs.scss';
import './assets/styles/login.scss';
import './assets/styles/registration.scss';
import './assets/styles/verification.scss';
import './assets/styles/editUsers.scss';
import './assets/styles/mobileHeaders.scss';
import './assets/styles/mobileFooter.scss';

Modal.setAppElement(document.body);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(requestMiddleware)),
);

requestMiddleware.on.fail = ((err) => {
  if (err.response) {
    return err.response;
  }
  throw err;
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
