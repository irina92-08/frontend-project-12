import App from "./src/assets/index.jsx";
import ReactDom from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const container = document.getElementById("chat");
const root = ReactDom.createRoot(container);
root.render(<App />);
