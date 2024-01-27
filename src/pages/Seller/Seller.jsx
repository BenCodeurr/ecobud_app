/* eslint-disable no-unused-vars */
import { useEffect, useId, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../../services/Firebase";
import Helmet from "../../components/Helmet/Helmet";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Seller() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [data, setData] = useState({
    id: "",
    title: "",
    detail: "",
    category: "Caps",
    price: 15,
  });

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "category") {
      const defaultPrice = getDefaultPrice(value);
      setData((prevData) => ({
        ...prevData,
        [id]: value,
        price: defaultPrice,
      }));
    } else {
      setData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const getDefaultPrice = (category) => {
    switch (category) {
      case "Shoes":
        return 50;
      case "Shirts":
        return 20;
      case "Bags":
        return 30;
      case "Trousers":
        return 40;
      case "Caps":
      default:
        return 15;
    }
  };

  const productImages = async (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImageURLs([]);

    const loadImage = async (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    for (const file of files) {
      const imageUrl = await loadImage(file);
      setImageURLs((prevURLs) => [...prevURLs, imageUrl]);
      setImages((prevImages) => [...prevImages, file]);
    }
  };

  const uploadImagesToStorage = async () => {
    const imagesUrls = [];

    for (const file of images) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          imagesUrls.push(downloadURL);
          resolve();
        });
      });
    }
    return imagesUrls;
  };

  const addProduct = (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      let userEmail = "";
      let userPhone = "";

      onAuthStateChanged(auth, (user) => {
        if (user) {
          userEmail = user.email;
          // userPhone = user.phoneNumber;
        } else {
          toast.error("User not logged in");
        }
      });

      const id = uuidv4();

      uploadImagesToStorage()
        .then((imageUrls) =>
          setDoc(doc(db, "products", id), {
            ...data,
            id: id,
            user: userEmail,
            phone: userPhone,
            images: imageUrls,
            timeStamp: serverTimestamp(),
          })
        )
        .then(() => {
          setImages([]);
          setImageURLs([]);
          setData({
            id: "",
            title: "",
            detail: "",
            category: "Caps",
            price: 15,
          });
          toast.success("Product successfully added", {
            position: "top-center",
            hideProgressBar: true,
            theme: "colored",
            pauseOnHover: true,
          });
        })
        .catch((err) => {
          toast.error("Error Adding product");
        });
    } catch (err) {
      toast.error("Error Adding product");
    }
  };

  return (
    <>
      <Helmet title={"New Product"}>
        <div className="top flex items-center justify-center h-[50px] shadow-md  ">
          <div className="me-auto lg:hidden">
            <button
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <aside
              id="default-sidebar"
              className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
              aria-label="Sidebar"
            >
              <div className="h-full py-5 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="image flex items-center px-4 font-bold gap-2 cursor-pointer mb-5">
                  <img src={logo} className="h-10" alt="Logo" />
                  ECOBUDDi
                </div>
                <Sidebar />
              </div>
            </aside>
          </div>

          <Link to="/" style={{ textDecoration: "none" }}>
            <span className=" text-xl me-2 lg:me-0 font-bold text-primary font-poppins">
              Welcome Back!
            </span>
          </Link>
        </div>
        <div className="min-h-screen text-primary lg:flex gap-20 lg:p-7 p-3 ">
          <div className="hidden lg:flex">
            <Sidebar />
          </div>
          <div className="flex flex-col gap-5 lg:w-[500px]">
            <h3 className="text-2xl font-poppins font-bold">New Item</h3>
            <div className=" ">
              <div className="flex flex-col lg:gap-10 gap-5">
                <div className="">
                  <label
                    htmlFor="file_upload"
                    className="w-[150px] cursor-pointer font-poppins font-medium text-white bg-primary p-2 rounded-md text-[13px] text-center px-3"
                  >
                    Upload Images
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    name="product"
                    onChange={productImages}
                    multiple
                    id="file_upload"
                  />
                </div>
                <div className="flex w-[150px] gap-2 mb-3">
                  {imageURLs.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt="Product Preview" />
                  ))}
                </div>
              </div>
              <form
                className="form flex flex-col gap-3"
                onSubmit={(e) => {
                  addProduct(e);
                }}
              >
                <input
                  className="outline-none border-none bg-[#F2F4F6] rounded-[5px]"
                  type="text"
                  id="title"
                  placeholder="Name of Product"
                  value={data.title}
                  onChange={handleInput}
                />
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <label className="text-gray-700 font-poppins font-bold text-[13px]">
                      Category:
                    </label>
                    <select
                      name="selectedCategory"
                      onChange={handleInput}
                      id="category"
                      value={data.category}
                      className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 font-poppins text-[13px]"
                    >
                      <option value="Caps">Caps</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Bags">Bags</option>
                      <option value="Trousers">Trousers</option>
                      <option value="Shoes">Shoes</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="font-poppins text-[13px] font-bold">
                      Price:
                    </label>
                    <select
                      name="selectedCategory"
                      onChange={handleInput}
                      id="price"
                      value={data.price}
                      disabled
                      className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black font-poppins text-[13px]"
                    >
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>

                <textarea
                  className="outline-none border-none overflow-hidden bg-[#F2F4F6] font-poppins text-[13px] rounded-[5px] pl-5 py-6 block"
                  rows={3}
                  id="detail"
                  placeholder="Product Details"
                  value={data.detail}
                  onChange={handleInput}
                />

                <button
                  type="submit"
                  className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
                >
                  Add
                </button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
}

export default Seller;
