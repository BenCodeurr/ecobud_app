/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../services/Firebase";
import Helmet from "../../components/Helmet/Helmet";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";

function Seller() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [data, setData] = useState({
    title: "",
    detail: "",
  });

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
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

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await uploadImagesToStorage();

      await addDoc(collection(db, "products"), {
        ...data,
        images: imageUrls,
        timeStamp: serverTimestamp(),
      });

      setImages([]);
      setImageURLs([]);
      setData({ title: "", detail: "" });
      toast.success("Product sucessfully added", {
        position: "top-center",
        hideProgressBar: "true",
        theme: "colored",
        pauseOnHover: "true",
      });
    } catch (err) {
      console.err("Error uploading images or adding product", err);
      toast.error("Error Addiing product");
    }
  };

  


  return (
    <>
      <Helmet title={"New Product"}>
        <div className="top flex items-center justify-center h-[50px] shadow-md">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="text-[20px] font-bold text-primary font-poppins">
              Welcome! Choga
            </span>
          </Link>
        </div>
        <div className="h-[100vh] text-primary flex gap-20 w-full p-7">
          <Sidebar />
          <div className="flex flex-col gap-5 w-[500px]">
            <h3 className="text-2xl font-poppins font-bold">New Item</h3>
            <div className="">
              <div className="flex flex-col gap-10">
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
              <form className="form flex flex-col gap-3">
                <input
                  className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
                  type="text"
                  id="title"
                  placeholder="Name of Product"
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
                      className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 font-poppins text-[13px]"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Clothing">Clothing</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <label className="font-poppins text-[13px] font-bold">
                      Price Range:
                    </label>
                    <select
                      name="selectedCategory"
                      onChange={handleInput}
                      id="price"
                      className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black font-poppins text-[13px]"
                    >
                      <option value="Range1">2-10</option>
                      <option value="Range2">10-50</option>
                      <option value="Range3">50-100</option>
                    </select>
                  </div>
                </div>

                <textarea
                  className="outline-none border-none overflow-hidden bg-[#F2F4F6] font-poppins text-[13px] rounded-[5px] pl-5 py-6 block"
                  rows={3}
                  id="detail"
                  placeholder="Product Details"
                  onChange={handleInput}
                />

                <button
                  type="submit"
                  className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
                  onClick={addProduct}
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
