import hero from "../../assets/images/hero.png";
import ld from "../../assets/images/ld.png";
// import chair from "../../assets/images/chair.jpg";
import "./Home.css";
// import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Nav/NavBar";
import Helmet from "../../components/Helmet/Helmet";
import { Button } from "flowbite-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet title={"Home"}>
        <NavBar />
        <div className="min-h-[80vh] text-white p-[30px] bg-primary flex flex-col justify-center">
          <div className="flex justify-around">
            <div className="flex flex-col gap-7 items-center md:items-start">
              <h3 className="text-secondary text-center md:text-left font-bold font-poppins uppercase text-[50px] md:text-[65px] md:w-[500px] tracking-[5px] leading-[90px]">
                Turn clutter into cash
              </h3>
              <p className="font-inter font-light text-center md:w-[400px] text-base md:text-left">
                Earn money by selling your used and unwanted goods or partner
                with us and donate to our platform.
              </p>
              <Button
                className=" bg-white hover:bg-orange-500 h-fit text-primary hover:text-white transition-all delay-[25ms] text-center rounded-md font-bold hidden md:block"
                onClick={() => navigate("/shop")}
              >
                SHOP NOW
              </Button>
            </div>
            <div className="hidden md:inline-block w-[300px]">
              <img
                src={hero}
                alt="University students shopping with Ecobuddi"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-around mt-10 gap-10">
          <div className="w-[300px] mx-auto md:mx-0">
            <img
              className="w-[400px]"
              src={ld}
              alt="female University student enjoying shopping with Ecobuddi"
            />
          </div>
          <div className="flex flex-col md:w-[40%] text-white gap-7">
            <h3 className="font-poppins text-[30px] font-bold md:text-[50px] text-black text-center md:text-start">
              Join Ecobuddi Today
            </h3>
            <p className="text-black mx-4 md:mx-0 text-center md:text-start font-inter font-light ">
              Ready to declutter, earn, and discover great deals? Join Ecobuddi
              now and experience the future of student-centric online selling.
            </p>
            <Button
              className=" bg-orange-500 h-fit w-fit mx-auto md:mx-0 text-white rounded-md font-bold"
              onClick={() => navigate("/login")}
            >
              LIST ITEM
            </Button>
          </div>
        </div>

  
      </Helmet>
    </>
  );
};
export default Home;
