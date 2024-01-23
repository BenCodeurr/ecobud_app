/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { FaApple } from "react-icons/fa";
import { TextField } from "@mui/material";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/google.png";
import { useState } from "react";
import { auth } from "../../services/Firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/shop");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="main-container relative h-[100vh] flex text-white p-[40px] bg-primary">
      <div className="image flex h-fit justify-center items-center font-bold">
        <img src={logo} className="h-10" alt="Logo" />
        ECOBUDDi
      </div>

      <div className="main-content flex justify-center items-center w-full px-20 gap-[30px]">
        <div className="left-content flex flex-col gap-[30px] w-[45%] mr-10">
          <h1 className="text-[40px] uppercase font-bold tracking-[8px]">
            Turn clutter <br />
            into cash
          </h1>
          <p className="text-[15px]">
            It is a movement and a good one as such! Sign up and start posting
            second hand items, declutter your space and earn some money.
          </p>
        </div>

        <div className="right-content bg-[#FAFAFA] text-black p-5 rounded-[20px] flex flex-col gap-4">
          <div className="heading mb-3">
            <h5 className="text-[10px]">LET'S GET YOU STARTED</h5>
            <h4 className="text-[20px] font-bold">Log into your account</h4>
          </div>
          <form className="form flex flex-col gap-3" onSubmit={handleLogin}>
            <TextField
              label="Your Name"
              color="secondary"
              focused
              placeholder="Your name"
              onChange={e=>setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              color="secondary"
              focused
              placeholder="********"
              onChange={e=>setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
            >
              Login
            </button>
          </form>
          {error && <p className="error text-red text-center font-poppins text-[12px]">Wrong email or password</p>}
          <div className="divider flex gap-3 justify-center items-center text-[13px]">
            <hr className="w-[150px]" />
            <span>Or</span>
            <hr className="w-[150px]" />
          </div>
          <div className="signup-options flex flex-col gap-4">
            <a href="" className="google">
              <img className="h-4" src={google} alt="" />
              Login with Google
            </a>

            <a href="" className="apple">
              <FaApple />
              Login With Apple
            </a>
          </div>
          <div className="user text-sm text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a className="font-bold text-primary" href="">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="octagon absolute bottom-6 h-[80px] w-[80px] overflow-hidden">
        <div className="inner w-[80px] h-[80px]  bg-secondary rotate-45"></div>
      </div>
    </div>
  );
};

export default Login;
