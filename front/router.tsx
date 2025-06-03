import { createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import App from "./layouts/App";
import Workspace from "@layouts/Workspace";

const Login = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Channel = loadable(() => import("@pages/Channel"));
const DirectMessage = loadable(() => import("@pages/DirectMessage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "workspace/:workspace",
        element: <Workspace />,
        children: [
          { path: "channel/:channel", element: <Channel /> },
          { path: "dm/:id", element: <DirectMessage /> },
        ],
      },
    ],
  },
]);
