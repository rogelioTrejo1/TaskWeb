import React from 'react';
import ReactDOM from 'react-dom';

// Application
import App from './App';

// Libs
import * as serviceWorkerRegistration from './libs/serviceWorkerRegistration';
import reportWebVitals from './libs/reportWebVitals';

// Styles
import "bootswatch/dist/lux/bootstrap.min.css";
import "./styles/styles.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();