import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";

import Login from "./componenets/Login";
import Register from "./componenets/Register";
import User from "./componenets/User";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
 
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/User" exact element={<User />} />}
      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/Register" />} />
    </Routes>
  );
};

export default App;
