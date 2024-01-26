/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaSearch } from "react-icons/fa";

function NavBar() {
  const navigate = useNavigate();

  const nav_link = [
    {
      path: "/",
      display: "HOME",
    },
    {
      path: "shop",
      display: "SHOP",
    },
    {
      path: "/",
      display: "ABOUT US",
    },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          className="text-[13px] md:text-[15px] image flex gap-3 h-fit justify-center items-center font-bold font-poppins cursor-pointer text-black"
          onClick={() => navigate("/")}
        >
          <img src={logo} className="h-10" alt="Logo" />
          <p className=" text-xl">ECOBUDDi</p>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium text-secondary flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {nav_link.map((item, index) => (
              <li key={index}>
                <a
                  className="cursor-pointer block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-primary"
                  onClick={() => navigate(`${item.path}`)}
                >
                  {item.display}
                </a>
              </li>
            ))}
            <a
            className="bg-orange h-fit w-[100px] text-white text-center py-2 rounded-[5px] font-bold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            LIST ITEM
          </a>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
