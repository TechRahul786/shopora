import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./features/store/store.js";
import AuthInithializer from "./AuthInithializer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthInithializer>
          <App />
        </AuthInithializer>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
