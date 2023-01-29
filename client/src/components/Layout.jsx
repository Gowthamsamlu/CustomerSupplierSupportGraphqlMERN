import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TailwindToaster from "./TailwindToaster";
import Login from "./Login";

const Layout = () => {
  const state = useSelector((state) => state.UserReducer);
  return (
    <main className='App bg-gray-100 h-screen max-h-screen'>
      <TailwindToaster />
      {state.user ? <Outlet /> : <Login />}
    </main>
  );
};

export default Layout;
