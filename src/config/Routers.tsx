import { RouterProvider, createBrowserRouter } from "react-router";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Dashboard from "../screens/user/Dashboard";

// ✅ Each route has it's own URL
const Router = createBrowserRouter([
  { path: "", element: <Login /> },
  { path: "/", element: <Login /> },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "user",
    children: [{ path: "dashboard", element: <Dashboard /> }],
  },
]);

export default Router;
