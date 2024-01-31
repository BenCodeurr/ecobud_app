/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../../services/Firebase";
import Helmet from "../../components/Helmet/Helmet";
import { v4 as uuidv4 } from "uuid";
import { Button, Navbar, Sidebar } from "flowbite-react";
import CustomSideBar from "../../components/Sidebar/CustomSideBar";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";

function Seller() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [data, setData] = useState({
    id: "",
    title: "",
    detail: "",
    category: "Accessories",
    price: 15,
    isSold: false,
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
      case "Accessories":
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

    if (
      images.length === 0 ||
      data.title.trim() === "" ||
      data.detail.trim() === "" ||
      data.price === ""
    ) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        hideProgressBar: true,
        theme: "colored",
        pauseOnHover: true,
      });
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      let userEmail = "";

      onAuthStateChanged(auth, (user) => {
        if (user) {
          userEmail = user.email;

          const id = uuidv4();

          uploadImagesToStorage()
            .then((imageUrls) =>
              setDoc(doc(db, "products", id), {
                ...data,
                id: id,
                user: userEmail,
                images: imageUrls,
                timeStamp: serverTimestamp(),
                price: data.price + 10, // 10 ghs
              })
            )
            .then(() => {
              setImages([]);
              setImageURLs([]);
              setData({
                id: "",
                title: "",
                detail: "",
                category: "Accessories",
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
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          toast.error("User not logged in");
        }
      });
    } catch (err) {
      toast.error("Error Adding product");
    }
    // finally{
    //   setLoading(false);
    // }
  };

  const navigate = useNavigate();

  return (
    <>
      <Helmet title={"New Product"}>
        {loading && (
          <div className=" flex justify-center mt-4">
            <BounceLoader color="#000000" loading={loading} size={50} />
          </div>
        )}
        <Navbar fluid rounded className=" md:hidden">
          <Navbar.Brand>
            <img src={logo} className="h-10" alt="Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-primary">
              ECOBUDDi
            </span>
          </Navbar.Brand>
          <div className="flex">
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Button
              className=" bg-red-600 h-fit text-white w-fit text-center rounded-md font-bold"
              onClick={() => navigate("/login")}
            >
              LOGOUT
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <div className="min-h-screen text-primary lg:flex gap-20 lg:p-7 p-3 mt-5 md:mt-0">
          <div className="hidden lg:flex">
            <CustomSideBar />
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
                    onChange={(e) => {
                      productImages(e);
                    }}
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
                  required
                  value={data.title}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <label className="text-gray-700 font-poppins font-bold text-[13px]">
                      Category:
                    </label>
                    <select
                      name="selectedCategory"
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      id="category"
                      value={data.category}
                      className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 font-poppins text-[13px]"
                    >
                      <option value="Accessories">Accessories</option>
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
                      onChange={(e) => {
                        handleInput(e);
                      }}
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
                  required
                  value={data.detail}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />

                {isSold ? (
                  <button
                    type="submit"
                    className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
                  >
                    Add
                  </button>
                ) : (
                  <button
                    disabled="disabled"
                    className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
                  >
                    Sold Out
                  </button>
                )}
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
