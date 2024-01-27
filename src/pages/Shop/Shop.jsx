/* eslint-disable react/no-unknown-property */
import Helmet from "../../components/Helmet/Helmet";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Nav/NavBar";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getFirestore();

    const productsCollection = collection(db, "products");

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(productsCollection);
        const productsData = querySnapshot.docs.map((doc) => doc.data());
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet title={"Shop"}>
        <NavBar/>
        <div className="flex gap-3 flex-wrap justify-center my-10">
        {products.map((product, index) => (
          <div
            key={index}
            className=" max-w-sm bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800"
          >
            <div onClick={() => navigate(`/shop/${product.id}`)} className="cursor-pointer">
              <img
                className="p-8 rounded-t-lg"
                src={product.images}
                alt="product image"
              />
            </div>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5">
                  {product.title}
                </h5>
              </a>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {"ghs " + product.price}
                </span>
                <div onClick={() => navigate(`/shop/${product.id}`)}
                 className="text-white bg-orange  hover:bg-orange-800 text-[12px] font-bold font-poppins rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                   View Details
                </div>
              
              </div>
            </div>
          </div>
        ))}
        </div>
        
      </Helmet>
    </>
  );
};

export default Shop;
