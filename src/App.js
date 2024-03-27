
import './App.css';
import React from "react";
import {  RouterProvider } from "react-router-dom";
import router from "./router/Router.js";

function App() {
  return  <RouterProvider router={router} />;
}

export default App;
