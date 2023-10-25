"use client";

import { FaBarsStaggered } from "react-icons/fa6";
import SystemSidebar from "../SystemSidebar";
import { useState } from "react";

const NavBar = () => {
  const [showNavDrawer, setShowNavDrawer] = useState(false);

  const toggleSidebar = () => {
    setShowNavDrawer((setShowNavDrawer) => !setShowNavDrawer);
  };

  return (
    <>
      <nav className="py-4 w-full fixed top-0 left-0 px-5 bg-white border-b flex items-center">
        <button className="text-2xl font-bold" onClick={toggleSidebar}>
          <FaBarsStaggered />
        </button> 
      </nav>
      <SystemSidebar showSideBar={showNavDrawer} setShowNavDrawer />
    </>
  );
};

export default NavBar;
