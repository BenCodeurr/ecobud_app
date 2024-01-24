/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";

function NavBar({shadow, padding}) {

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
      path: "about",
      display: "ABOUT US",
    },
  ];

  return (
    <nav className={`flex justify-around items-center shadow-${shadow} py-${padding} mb-10`}>
          <div className="text-[13px] md:text-[15px] image flex h-fit justify-center items-center font-bold font-poppins cursor-pointer" onClick={()=>navigate("/")}>
            <img src={logo} className="h-10" alt="Logo" />
            ECOBUDDi
          </div>
          <div className="text-[13px] md:text-[15px] flex gap-4 font-poppins">
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
          <div className="flex gap-4 justify-center items-center">
            <a
              href=""
              className="hidden md:inline-block bg-orange h-fit w-[100px] text-center py-2 rounded-[5px] text-[13px] font-medium"
            >
              LIST ITEM
            </a>
            <FaSearch className="text-orange cursor-pointer" />
            {/* <FaRegUser className="text-orange cursor-pointer" /> */}
            {/* <PiShoppingCart className="text-orange cursor-pointer" /> */}
          </div>
        </nav>
  )
}
export default NavBar