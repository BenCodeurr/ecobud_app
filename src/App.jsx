/* eslint-disable react/prop-types */
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Shop from "./pages/Shop/Shop";
import Seller from "./pages/New/Seller";
import ProductDetails from "./pages/Single/ProductDetails";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  console.log(currentUser);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route exact path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="shop" element={<Shop />} />
        <Route
          exact
          path="seller"
          element={
            <RequireAuth>
              <Seller />
            </RequireAuth>
          }
        />
        <Route exact path="shop/:id" element={<ProductDetails />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
