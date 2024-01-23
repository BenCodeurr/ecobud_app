import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";

import hero from "../../assets/images/hero.png";
import ld from "../../assets/images/ld.png";
import chair from "../../assets/images/chair.jpg";
import "./Home.css";
import ProductCard from "../../components/ProductCard";

const Home = () => {
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
    <>
      <div className="h-[100vh] text-white p-[30px] bg-primary flex flex-col gap-20">
        <nav className="flex justify-around h-[50px] items-center">
          <div className="image flex h-fit justify-center items-center font-bold">
            <img src={logo} className="h-10" alt="Logo" />
            ECOBUDDi
          </div>
          <div className="flex gap-4 font-poppins">
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
              className="bg-orange h-fit w-[100px] text-center py-2 rounded-[5px] text-[13px] font-medium"
            >
              LIST ITEM
            </a>
            <FaSearch className="text-orange cursor-pointer" />
            <FaRegUser className="text-orange cursor-pointer" />
            <PiShoppingCart className="text-orange cursor-pointer" />
          </div>
        </nav>
        <div className="flex justify-around">
          <div className="flex flex-col gap-7">
            <h3 className="text-secondary font-bold font-poppins uppercase text-[70px] w-[500px] tracking-[5px] leading-[90px]">
              Turn clutter into cash
            </h3>
            <p className="font-inter font-light w-[400px] text-base">
              Earn money by selling your used and unwanted goods or partner with
              us and donate to our platform.
            </p>
            <a
              href=""
              className="bg-white text-black h-fit w-[100px] text-center py-2 rounded-[5px] text-[13px] font-medium"
            >
              Shop Now
            </a>
          </div>
          <div className="w-[300px]">
            <img src={hero} alt="" />
          </div>
        </div>
      </div>

      <div className="flex justify-around mt-10 gap-10">
        <div className="w-[300px]">
          <img src={ld} alt="" />
        </div>
        <div className="flex flex-col w-[40%] justify-center text-white gap-7">
          <h3 className="font-poppins text-[50px] text-black">Sit donec</h3>
          <p className="text-black">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam,
            iure. Dolore quasi inventore id aliquid fuga adipisci! Ad architecto
            amet, perferendis dolores est, ipsam, dolorem quos saepe consequatur
            perspiciatis beatae.
          </p>
          <a
            href=""
            className="bg-orange h-fit w-[100px] text-center py-2 rounded-[5px] text-[13px] font-medium"
          >
            LIST ITEM
          </a>
        </div>
      </div>

      <div className="flex mt-20 gap-10 flex-col">
        <h3 className="text-[40px] font-poppins font-bold ml-16">
          Trending Products
        </h3>
        <div className="flex gap-6 justify-center items-center">
          <ProductCard img={chair} category="CHAIR" />
          <ProductCard img={chair} category="TANKS" />
          <ProductCard img={chair} category="ELECTRONICS" />
        </div>
      </div>
    </>
  );
};
export default Home;
