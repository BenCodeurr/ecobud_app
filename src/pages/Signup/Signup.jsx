/* eslint-disable react/no-unescaped-entities */
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/google.png";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="main-container relative h-[100vh] flex text-white p-[40px] bg-primary font-inter">
      <div className="image flex h-fit justify-center items-center font-bold gap-2">
        <img src={logo} className="h-10" alt="Logo" />
        ECOBUDDi
      </div>

      <div className="main-content flex justify-center items-center w-full px-20 gap-[30px]">
        <div className="left-content flex flex-col gap-[30px] w-[45%] mr-10">
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
            <h4 className="text-[20px] font-bold">Log into your account</h4>
          </div>
          <form className="form flex flex-col gap-3">
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="text"
              placeholder="Your Name"
              required
            />
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="email"
              placeholder="Email Adress"
              required
            />
            <input
              className="outline-none border-none bg-[#F2F4F6] rounded-[5px] pl-5 py-6 h-10 block"
              type="password"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="rounded-[5px] bg-primary text-white text-[12px] p-[10px] font-bold hover:bg-secondary shadow-sm"
            >
              Sign Up
            </button>
          </form>
          <p className="error text-red text-center font-poppins text-[11px]">
            All fields are mandatory
          </p>
          <div className="divider flex gap-3 justify-center items-center text-[13px] text-[#a5a5a5]">
            <hr className="w-[150px]" />
            <span className="font-light text-[10px]">Or</span>
            <hr className="w-[150px]" />
          </div>
          <div className="signup-options flex flex-col gap-4 font-poppins text-grey">
            <a href="" className="google">
              <img className="h-4" src={google} alt="" />
              Sign Up with Google
            </a>

            <a href="" className="apple">
              <FaApple />
              Sign Up With Apple
            </a>
          </div>
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
        </div>
      </div>

      <div className="octagon absolute bottom-6 h-[80px] w-[80px] overflow-hidden">
        <div className="inner w-[80px] h-[80px]  bg-secondary rotate-45"></div>
      </div>
    </div>
  );
};

export default Signup;
