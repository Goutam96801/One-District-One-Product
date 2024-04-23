import './App.css';
import Navbar from './components/navbar.component';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home.page';
import UserAuthentication from './pages/user-authentication.page';
import SellerAuthentication from './vendor/user-authentication.vendor';
import { createContext, useEffect, useState } from 'react';
import { lookInSession } from './common/session';
import AddProduct from './vendor/add-product.vendor';
import VendorProfile from './vendor/profile.vendor';
import ProductPage from './pages/product.page';
import ProductDetailPage from './pages/product-detail.page';
import DashboardVendor from './vendor/dashboard.vendor';
import Cart from './pages/cart.page';

export const UserContext = createContext({});

function App() {

  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token: null})
  }, [])

  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
    <Routes>
     <Route path='/' element={<Navbar/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='login' element={<UserAuthentication type='sign-in'/>}/>
      <Route path='signup' element={<UserAuthentication type='sign-up'/>}/>
      <Route path='seller/login' element={<SellerAuthentication type='seller-sign-in'/>}/>
      <Route path='seller/signup' element={<SellerAuthentication type='seller-sign-up'/>}/>
      <Route path='seller/profile/:id' element={<VendorProfile/>}/>
      <Route path='seller/dashboard' element={<DashboardVendor/>}/>
      <Route path='view_cart' element={<Cart/>}/>
      <Route path='add-product' element={<AddProduct/>}/>
      <Route path='products' element={<ProductPage/>}/>
      <Route path='product/:product_id' element={<ProductDetailPage/>}/>
     </Route>
     </Routes>
     </UserContext.Provider>
  );
}

export default App;
