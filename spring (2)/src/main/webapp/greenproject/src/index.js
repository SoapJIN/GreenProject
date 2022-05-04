import "./bootstrap-custom.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { HashRouter as Router } from "react-router-dom";
import {createStore} from 'redux'
import reducer from "./Reducer";
import { Provider } from "react-redux";


library.add(fas, far, fab);

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

