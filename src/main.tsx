import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);
