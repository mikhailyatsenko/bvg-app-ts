import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { HashRouter } from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    {/* <BrowserRouter basename={import.meta.env.DEV ? "/" : "/bvg-app-ts/"}> */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </StoreProvider>
);
