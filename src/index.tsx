import ReactDOM from "react-dom/client";
import App from "./containers/StopsLoader";

import "./scss/normalize.scss";
import "./scss/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
