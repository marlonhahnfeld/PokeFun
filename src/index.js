import React from "react";
import HigherLowerGamePage from "./pages/HigherLowerGamePage";
import TestPage from "./pages/Test";
import ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "higherlower",
      element: <HigherLowerGamePage/>,
    },
    {
        path: "test",
        element: <TestPage/>,
    }
  ]);


 const root = ReactDOM.createRoot(document.getElementById("root"));

 root.render(
    <RouterProvider router={router}/>
 )