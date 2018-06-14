import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './ducks/store';
import {unregister} from './registerServiceWorker';
import 'typeface-roboto';

ReactDOM.render(

    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
unregister();
