import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import {positions,Provider as AlertProvider,transitions} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
const options = {
  timeout:5000,
  position:positions.TOP_CENTER,
  transition: transitions.FADE
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options}>

    {/* <React.StrictMode> */}
      <App />
  </AlertProvider>
    {/* </React.StrictMode> */}
  </Provider>
);
