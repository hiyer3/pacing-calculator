import Link from "next/link";
import { IoIosSpeedometer } from "react-icons/io";
import { BsFillCalendarRangeFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import { BiSolidLogIn } from "react-icons/bi";

const SystemSidebar = (props) => {
  return (
    <>
      <div
        id="drawer-navigation"
        className={`${
          props.showNavDrawer ? "translate-x-0" : "translate-x-0"
        } w-16 h-screen hidden lg:inline-block fixed py-4 mt-14 overflow-y-auto border transition-transform bg-white`}
        tabIndex={-1} 
        aria-labelledby="drawer-navigation-label"
      >
        <div className="py-4 overflow-y-auto">
          <ul className="flex items-center flex-col gap-8">
            <li>
              <Link 
                href="/"
                onClick={props.toggleSidebar}
                className="flex items-center text-gray-500 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-2xl">
                  <IoIosSpeedometer />
                </span>

                <span className="ml-3 hidden">Pacing</span>
              </Link>
            </li>

            <li>
              <Link
                href="/plan"
                onClick={props.toggleSidebar}
                className="flex items-center text-gray-500 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-xl">
                  <BsFillCalendarRangeFill />
                </span>
                <span className="flex-1 ml-3 whitespace-nowrap hidden">Plan</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-500 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-2xl -ml-1">
                  <BiSolidLogIn />
                </span>
                <span className="flex-1 ml-3 whitespace-nowrap hidden">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-500 rounded-lg hover:bg-gray-100 group"
              >
                <span className="text-xl">
                  <AiOutlineForm />
                </span>
                <span className="flex-1 ml-3 whitespace-nowrap hidden">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SystemSidebar;
