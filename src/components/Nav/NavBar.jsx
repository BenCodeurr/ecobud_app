/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaSearch } from "react-icons/fa";
// import { PiShoppingCart } from "react-icons/pi";

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
    <nav className="flex justify-around items-center py-6 shadow-md text-white">
      <div
        className="text-[13px] md:text-[15px] image flex h-fit justify-center items-center font-bold font-poppins cursor-pointer text-black"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-10" alt="Logo" />
        ECOBUDDi
      </div>
      <div className="text-[13px] md:text-[14px] flex gap-4 font-poppins text-black">
        {nav_link.map((item, index) => (
          <a
            className="cursor-pointer"
            key={index}
            onClick={() => navigate(`${item.path}`)}
          >
            {item.display}
          </a>
        ))}
      </div>
      <div className="flex gap-9 justify-center items-center">
        <a className="hidden md:inline-block bg-orange h-fit w-[100px] text-center py-2 rounded-[5px] text-[12px] font-bold cursor-pointer" onClick={()=>navigate("/login")}>
          LIST ITEM
        </a>
        <FaSearch className="text-orange cursor-pointer" />
        {/* <FaRegUser className="text-orange cursor-pointer" /> */}
        {/* <PiShoppingCart className="text-orange cursor-pointer" /> */}
      </div>
    </nav>
  );
}
export default NavBar;
