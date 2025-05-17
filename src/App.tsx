import { RouterProvider } from "react-router-dom"; // Adjust the import path if it's a custom component
import { router } from "./Rotes/Routes";
import React from "react";
import { Toaster } from "react-hot-toast";

function App() {

  // Todo Auto login when we have a user and login
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const userString = localStorage.getItem("user");
  //   const user = userString ? JSON.parse(userString) : null;
  //   const token = localStorage.getItem("token");

  //   if(!!user && !!token)
  //     navigate("")
  // }, [])
  
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster/>
    </React.StrictMode>
  )
}

export default App
