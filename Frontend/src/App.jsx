import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";

import Log from "./pages/Log";
import {ToastContainer} from "react-toastify"


// import FormikLogin from "./pages/FormikLogin";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassword from "./pages/ForgetPassword";
import UserProfile from "./pages/UserProfile";
import FriendProfile from "./pages/FriendProfile";

const App = () => {
  let userSlice = useSelector((state) => state.users);
  console.log(userSlice);
  let login = userSlice.login; // false
  let dispatch = useDispatch();

  return (
    <div className=" min-h-screen">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={login === true ? <Home /> : <Navigate to={"/login"} />}
          />

          <Route
            path="/signup"
            element={login === false ? <Signup /> : <Navigate to={"/"} />}
          />

          <Route
            path="/login"
            element={login === false ? <Log /> : <Navigate to={"/"} />}
          />
          <Route
            path="/forgetPassword"
            element={
              login === false ? <ForgetPassword /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/userProfile"
            element={
              login === true ? <UserProfile /> : <Navigate to={"/login"} />
            }
          />

          {/* <Route path="/friendProfile" element={<FriendProfile />} /> */}

          <Route
            path="/friendProfile"
            element={
              login === true ? <FriendProfile /> : <Navigate to={"/login"} />
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
