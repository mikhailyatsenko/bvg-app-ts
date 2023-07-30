import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./store";

import App from "./containers/StopsLoader";

import "./scss/normalize.scss";
import "./scss/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
