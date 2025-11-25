import App from "./src/assets/index.jsx";
import ReactDom from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Provider } from "react-redux";
import store from "./src/assets/slices/index.js";

const container = document.getElementById("chat");
const root = ReactDom.createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
