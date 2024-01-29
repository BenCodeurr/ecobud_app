/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import { auth, db } from "../../services/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const createAccount = async (e) => {
    e.preventDefault();


    if (!name || !phone || !email || !password) {
      setError(true);
      toast.error("Kindly fill all the fields", {
        position: "top-right",
        hideProgressBar: true,
        theme: "colored",
        pauseOnHover: true,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        name: name,
        phone: phone,
        email: email,
        password: password,
      });

      dispatch({ type: "LOGIN", payload: user });
      navigate("/seller");
    } catch (err) {
      setError(true);
      console.log("Error creating your account ", err);
    }
  };
  return (
    <div className="relative min-h-screen justify-center flex flex-col gap-7 md:flex-row text-white p-[40px] bg-primary font-inter">
      <div
        className="image flex h-fit justify-center items-center font-bold gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-10" alt="Logo" />
        ECOBUDDi
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center w-full px-20 gap-[30px]">
        <div className="md:flex flex-col md:gap-[30px] md:w-[45%] md:mr-10 hidden">
          <h1 className="text-[40px] uppercase font-bold font-poppins tracking-[8px]">
            Turn clutter <br />
            into cash
          </h1>
          <p className="text-[15px] font-light">
            It is a movement and a good one as such! Sign up and start posting
            second hand items, declutter your space and earn some money.
          </p>
        </div>

        <div className="right-content bg-[#FAFAFA] text-black p-7 rounded-[20px] flex flex-col gap-4">
          <div className="heading mb-3">
            <h5 className="text-[10px]">LET'S GET YOU STARTED</h5>
            <h4 className="text-[20px] font-bold">Create an account</h4>
          </div>
          <form
            className="form flex flex-col gap-3"
            onSubmit={(e) => {
              createAccount(e);
            }}
          >
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="email"
              placeholder="Email Adress"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
            >
              Sign Up
            </button>
          </form>
          <div className="user text-[13px] text-center mt-3 font-poppins">
            <p>
              Already have an account?{" "}
              <a
                className=" cursor-pointer font-bold text-primary"
                onClick={() => navigate("/login")}
              >
                Login here
              </a>
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
