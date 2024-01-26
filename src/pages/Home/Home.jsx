import hero from "../../assets/images/hero.png";
import ld from "../../assets/images/ld.png";
import chair from "../../assets/images/chair.jpg";
import "./Home.css";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Nav/NavBar";
import Helmet from "../../components/Helmet/Helmet";

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
              <a
                className="bg-white text-black h-fit text-center md:py-2 py-4 px-3 text-xl md:text-base rounded-[5px] font-medium cursor-pointer uppercase hover:bg-orange hover:text-white transition-all duration-200"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </a>
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
            <img className="w-[400px]" src={ld} alt="female University student enjoying shopping with Ecobuddi" />
          </div>
          <div className="flex flex-col md:w-[40%] text-white gap-7">
            <h3 className="font-poppins text-[50px] text-black text-center md:text-start">Sit donec</h3>
            <p className="text-black text-center md:text-start">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Quibusdam, iure. Dolore quasi inventore id aliquid fuga adipisci!
              Ad architecto amet, perferendis dolores est, ipsam, dolorem quos
              saepe consequatur perspiciatis beatae.
            </p>
            <a
              className="bg-orange h-fit w-fit mx-auto md:mx-0 text-white text-center md:py-2 py-4 px-3 text-xl md:text-base rounded-[5px] font-bold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              LIST ITEM
            </a>
          </div>
        </div>

        <div className="flex mt-20 gap-10 flex-col">
          <h3 className="text-[40px] font-poppins font-bold text-center">
            Trending Products
          </h3>
          <div className="lg:flex gap-6 justify-center items-center">
            <ProductCard img={chair} category="CHAIR" />
            <ProductCard img={chair} category="TANKS" />
            <ProductCard img={chair} category="ELECTRONICS" />
          </div>
        </div>
      </Helmet>
    </>
  );
};
export default Home;
