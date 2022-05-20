import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import {store} from "./store"
import {PersistGate} from "redux-persist/integration/react"
import {persistor} from "./store"

import './index.css'
import App from './App'

const root = ReactDOM.createRoot(
    document.getElementById('root')!
)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);