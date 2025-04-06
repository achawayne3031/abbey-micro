import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Router from "./config/Routers";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
