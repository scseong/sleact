import "core-js/stable";
import "regenerator-runtime/runtime";
import { render } from "react-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import axios from "axios";
import { ToastContainer } from "react-toastify";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "https://sleact.nodebird.com" : "http://localhost:3090";

render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>,
  document.querySelector("#app"),
);
