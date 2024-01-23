import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";
import Button from "../components/Button";
import hero from "../assets/images/hero.png";
import ld from "../assets/images/ld.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[100vh] text-white p-[30px] bg-primary flex flex-col gap-20">
        <nav className="flex justify-around h-[50px] items-center">
          <div className="image flex h-fit justify-center items-center font-bold">
            <img src={logo} className="h-10" alt="Logo" />
            ECOBUDDi
          </div>
          <div className="flex gap-4 font-poppins">
            <a href="" className="" onClick={() => navigate("/")}>
              HOME
            </a>
            <a href="" className="" onClick={() => navigate("/shop")}>
              SHOP
            </a>
            <a href="" className="" onClick={() => navigate("/")}>
              ABOUT US
            </a>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <Button btnText="LIST ITEM" btnColor="orange" />
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
            <Button btnText="Shop Now" btnColor="orange" />
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
          <p className="text-black">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, iure. Dolore quasi inventore id aliquid fuga adipisci! Ad architecto amet, perferendis dolores est, ipsam, dolorem quos saepe consequatur perspiciatis beatae.</p>
          <Button btnText='LIST ITEM 'btnColor='orange'/>
        </div>
      </div>
    </>
  );
};
export default Home;
