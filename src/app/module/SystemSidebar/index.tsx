"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosSpeedometer } from "react-icons/io";
import { BsFillCalendarRangeFill } from "react-icons/bs";
import { AiOutlineClose, AiOutlineForm } from "react-icons/ai";
import { BiSolidLogIn } from "react-icons/bi";

const SystemSidebar = () => {
  const [showNavDrawer, setShowNavDrawer] = useState(false);

  const toggleSidebar = () => {
    setShowNavDrawer((setShowNavDrawer) => !setShowNavDrawer);
  };

  return (
    <>
      <button className="text-2xl font-bold" onClick={toggleSidebar}>
        <FaBarsStaggered />
      </button>

      <div
        id="drawer-navigation"
        className={`${
          showNavDrawer ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase "
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleSidebar}
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
        >
          <span className="text-2xl">
            <AiOutlineClose />
          </span>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-2xl">
                  <IoIosSpeedometer />
                </span>

                <span className="ml-3">Pacing</span>
              </Link>
            </li>

            <li>
              <Link
                href="/plan"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-xl">
                  <BsFillCalendarRangeFill />
                </span>
                <span className="flex-1 ml-3 whitespace-nowrap">Plan</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-2xl -ml-1">
                  <BiSolidLogIn />
                </span>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-lg">
                  <AiOutlineForm />
                </span>
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className={`${
          showNavDrawer ? "block" : "hidden"
        } bg-gray-900 bg-opacity-50 fixed inset-0 z-30`}
      ></div>
    </>
  );
};

export default SystemSidebar;
