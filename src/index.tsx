import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { setupStore } from "./store";

import App from "./containers/StopsLoader";

import "./scss/normalize.scss";
import "./scss/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
