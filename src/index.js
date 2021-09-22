import { GlobalStyles } from "global-styles";
import React from "react";
import "normalize.css";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(
    <>
        <GlobalStyles />
        <App />,
    </>,
    document.getElementById("root")
);
