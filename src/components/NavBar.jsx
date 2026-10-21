import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ padding: "10px 0", borderBottom: "1px solid #ccc" }}>
      <NavLink to="/" end>
        Trang chủ
      </NavLink>
      <NavLink to="/events" end>
        Danh sách
      </NavLink>
      <NavLink to="/events/new" end>
        Thêm mới
      </NavLink>
    </nav>
  );
};

export default NavBar;