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
import { auth, signInWithGoogle, signUpWithGoogle } from "../../services/Firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import { Button } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const text = [
  {
    title: "Turn clutter into cash",
    content: `Earn money by selling your used and unwanted goods or partner with us and donate to our platform.`,
  },
  {
    title: "The Birth of Ecobuddi",
    content: `Amid brainstorming sessions and countless cups of coffee, the Ecobuddi concept was born. We asked ourselves, "What if we could create a marketplace that helped students declutter their lives and put money in their pockets?" That spark of inspiration fuelled our commitment to make it a reality.`,
  },
  {
    title: "Our Mission",
    content: `We're not just a marketplace; we're a community that believes in the potential of every item, the value of sustainability, and the importance of student empowerment.
    Our team, hailing from multiple African countries, shares a deep passion for technology and a commitment to positively impacting the continent.
    We invite you to join us on this exciting journey of solving a real problem that impacts students and the environment. Together, we can make a difference.`,
  },
];

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

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      toast({
        description: "Successfully Registered",
        duration: 3000,
        status: "success",
        colorScheme: "green",
      });
      navigate("/seller");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        return;
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative min-h-screen justify-center gap-7 md:flex-row text-white p-[40px] bg-primary font-inter">
      <div
        className="image flex h-fit items-center font-bold gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="h-10" alt="Logo" />
        ECOBUDDi
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center w-full px-20 gap-[30px]">
        {/* <div className="md:flex flex-col md:gap-[30px] md:w-[45%] md:mr-10 hidden">
          <h1 className="text-[40px] uppercase font-bold font-poppins tracking-[8px]">
            Turn clutter <br />
            into cash
          </h1>
          <p className="text-[15px] font-light">
            It is a movement and a good one as such! Sign up and start posting
            second hand items, declutter your space and earn some money.
          </p>
        </div> */}

          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper mt-5"
          >
            {text.map((text, index)=> (
              <>
              <SwiperSlide key={index} className="px-5 xl:px-20 min-h-10 py-10 ">
                <h1 className="text-[40px] uppercase font-bold font-poppins tracking-[8px] text-secondary">
                {text.title}
                </h1>
                <p className="text-[15px] font-light">
             
                {text.content}
              </p>
              </SwiperSlide>
              </>
            ))}
          </Swiper>

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
          <Button className=" bg-secondary text-primary" onClick={handleGoogleSignIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="34"
              height="34"
              viewBox="0 0 48 48"
              style={{ marginRight: 10 }}
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign in with Google
          </Button>
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
