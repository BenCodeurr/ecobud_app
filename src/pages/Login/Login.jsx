/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { FaApple } from "react-icons/fa";
// import { TextField } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import google from "../../assets/images/google.png";
import { useState, useContext } from "react";
import { auth } from "../../services/Firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      toast.error("Kindly fill all the fields", {
        position: "top-right",
        hideProgressBar: true,
        theme: "colored",
        pauseOnHover: true,
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/seller");
      })
      .catch((error) => {
        setError(true);
        toast.error("Unable to log you in", {
          position: "top-center",
          hideProgressBar: true,
          theme: "colored",
          pauseOnHover: true,
        });
      });
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

        <div className=" bg-[#FAFAFA] text-black p-7 rounded-[20px] flex flex-col gap-4 ">
          <div className="heading mb-3">
            <h5 className="text-[10px]">LET'S GET YOU STARTED</h5>
            <h4 className="text-[20px] font-bold">Log into your account</h4>
          </div>
          <form
            className="form flex flex-col gap-3"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
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
              Login
            </button>
          </form>
          <ToastContainer />
          {/* {error && (
            <p className="error text-red text-center font-poppins text-[11px]">
              Wrong email or password
            </p>
          )} */}
          <div className="user text-[13px] text-center mt-3 font-poppins">
            <p>
              Don't have an account?{" "}
              <a
                className="font-bold text-primary cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
