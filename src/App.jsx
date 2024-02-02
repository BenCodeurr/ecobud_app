/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Shop from "./pages/Shop/Shop";
import Seller from "./pages/Seller/Seller";
import ProductDetails from "./pages/Single/ProductDetails";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./index.css";
import About from "./pages/About/About";
import ReactGA from "react-ga";
// Initialize React Ga with your tracking ID
ReactGA.initialize("G-VGPKHMKJWC");

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="shop" element={<Shop />} />
      <Route path="about-us" element={<About />} />
      <Route
        path="seller"
        element={
          <RequireAuth>
            <Seller />
          </RequireAuth>
        }
      />
      <Route path="shop/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
