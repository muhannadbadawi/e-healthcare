import { RouterProvider } from "react-router-dom"; // Adjust the import path if it's a custom component
import { router } from "./Rotes/Routes";
import React from "react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster/>
    </React.StrictMode>
  )
}

export default App
