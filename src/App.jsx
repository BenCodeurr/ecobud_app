import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Cart from './pages/Cart';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';

 function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="shop" element={<Shop />} />
        <Route exact path="checkout" element={<Checkout />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="cart" element={<Cart />} />
        <Route exact path="shop/:id" element={<ProductDetails />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}


export default App;
