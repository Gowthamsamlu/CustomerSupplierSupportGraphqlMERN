import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TailwindToaster from "./TailwindToaster";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";

const Layout = () => {
  const state = useSelector((state) => state.UserReducer);
  return (
    <main className='App bg-gray-100 h-screen max-h-screen'>
      <TailwindToaster />
      {state.user ? (
        <>
          <NavBar />
          {window.location.pathname === "/login" ? <Dashboard /> : <Outlet />}
        </>
      ) : (
        <Login />
      )}
    </main>
  );
};

export default Layout;
