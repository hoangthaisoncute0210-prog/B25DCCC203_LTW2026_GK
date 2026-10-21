import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div style={{ maxWidth: "850px", margin: "20px auto", padding: "0 15px", fontFamily: "sans-serif" }}>
      <NavBar />
      <main style={{ marginTop: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;