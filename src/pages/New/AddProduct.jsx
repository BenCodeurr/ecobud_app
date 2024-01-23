/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import { addDoc, collection, setDoc, doc, serverTimestamp} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../services/Firebase'

function AddProduct() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [data, setData] = useState([]);

  useEffect(()=>{

  }, )

  const handleInput = (e) =>{
    const id = e.target.id;
    const value = e.target.value;

    setData({...data, [id]:value});
  }

  const productImages = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImageURLs([]);
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImageURLs([...imageURLs, reader.result]);
          setImages([...images, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addProduct = async (e)=>{
    e.preventDefault();
    try{

        await addDoc(collection(db, "products"), {
            ...data,
           timeStamp: serverTimestamp(),
          });
    }catch(err){
        console.log(err)
    }
  }

  return (
    <>
      <NavBar shadow="md" padding={5} />
      <div className="h-[100vh] text-primary flex flex-col gap-10 px-10">
        <h3 className="text-3xl font-poppins font-bold">New Item</h3>

        <div className="w-[40%]">

        <div className="flex flex-col gap-10">
          <div className="">
            <label
              htmlFor="file_upload"
              className="w-[150px] cursor-pointer font-poppins font-medium text-white bg-primary p-2 rounded-full text-[13px] text-center"
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
          <div className="flex w-[100px] gap-2">
            {imageURLs.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt="Product Preview" />
            ))}
          </div>
        </div>
        <form className="form flex flex-col gap-3" onSubmit={addProduct}>
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="text"
              id="p"
              placeholder="Product Name"
              onChange={handleInput}
              
            />
            <textarea
              className="outline-none border-none overflow-hidden bg-[#F2F4F6] font-poppins text-[13px] rounded-[5px] pl-5 py-6 block"
             rows={3}
             id="d"
              placeholder="Product Details"
              onChange={handleInput}
              
            />
            
            <button
              type="submit"
              className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddProduct;
