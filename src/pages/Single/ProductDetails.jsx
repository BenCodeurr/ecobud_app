
/* eslint-disable react/no-unescaped-entities */
import Helmet from "../../components/Helmet/Helmet";
import NavBar from "../../components/Nav/NavBar";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if(!product){
    return(
      <div>
        <p>No Product Data available</p>
      </div>
    );
  }

  return (
    <Helmet title={"Product"}>
      <NavBar />
      <div className="h-[80vh] mt-10 md:mt-0 p-6 md:p-0 md:flex md:gap-10 md:flex-row-reverse md:justify-center md:items-center">
        <div className="flex flex-col gap-7 md:w-[400px]">
          <h3 className="text-3xl font-poppins font-bold">{product.title}</h3>
          <span className="font-bold">GHS {product.price}</span>
          <p className="font-poppins font-light text-[13px]">
            {product.detail}
          </p>
          <div className="md:hidden">
            <img src={product.images} alt="" />
          </div>
          <a
            href=""
            className="text-[12px] bg-orange  hover:bg-orange-800 text-white p-3 text-center font-extrabold"
          >
            Buy
          </a>
        </div>
        <div className="hidden md:flex h-[300px]">
          <img src={product.images} alt="" />
        </div>
      </div>
    </Helmet>
  );
};
export default ProductDetails;
