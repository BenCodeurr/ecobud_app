/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import {
  auth,
  db,
  signInWithGoogle,
  signUpWithGoogle,
} from "../../services/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { hash } from "bcryptjs-react";
import { Button } from "flowbite-react";

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
      const hashedPassword = await hash(password, 10);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        hashedPassword
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        name: name,
        phone: phone,
        email: email,
        password: hashedPassword,
      });

      dispatch({ type: "LOGIN", payload: user });
      navigate("/seller");
    } catch (err) {
      setError(true);
      console.log("Error creating your account ", err);
    }
  };

  const handleGoogleSignUp = async (e) => {
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
      console.log(error);
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
            <Button
              className=" bg-secondary text-primary"
              onClick={handleGoogleSignUp}
            >
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
              Sign up with Google
            </Button>
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
