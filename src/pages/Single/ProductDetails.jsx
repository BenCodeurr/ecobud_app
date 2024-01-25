/* eslint-disable react/no-unescaped-entities */
import Helmet from "../../components/Helmet/Helmet";
import NavBar from "../../components/Nav/NavBar";
import productImg from "../../assets/images/chair.jpg";

const ProductDetails = () => {
  return (
    <Helmet title={"Product"}>
      <NavBar />
      <div className="h-[80vh] mt-10 md:mt-0 p-6 md:p-0 md:flex md:gap-10 md:flex-row-reverse md:justify-center md:items-center">
        <div className="flex flex-col gap-7 md:w-[400px]">
          <h3 className="text-3xl font-poppins font-bold">Chair</h3>
          <span className="font-bold">GHS 99.99</span>
          <p className="font-poppins font-light text-[13px]">
            The gently curved lines accentuated by sewn details are kind to your
            body and pleasant to look at. Also, there’s a tilt and
            height-adjusting mechanism that's built to outlast years of ups and
            downs.
          </p>
          <div className="md:hidden">
            <img src={productImg} alt="" />
          </div>
          <a
            href=""
            className="text-[12px] bg-primary text-white p-3 text-center font-extrabold"
          >
            Buy
          </a>
        </div>
        <div className="hidden md:flex h-[300px]">
          <img src={productImg} alt="" />
        </div>
      </div>
    </Helmet>
  );
};
export default ProductDetails;
