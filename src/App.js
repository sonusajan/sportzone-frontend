import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Admin/Dashboard';
import Home from './Pages/Home';
import About from './Pages/About';
import Contactus from './Pages/Contactus';
import Cart from './Pages/User/Cart';
import Items from './Pages/User/Items';
import AdminForm from './Pages/Admin/AdminForm';
import ProductDetails from './Pages/Admin/ProductDetails';
import Users from './Pages/Admin/Users';
import Orders from './Pages/Admin/Orders';
import Profile from './Pages/User/Profile';

import OrderDetails from './Pages/User/OrderDetails';
import ForgetPassword from './Pages/User/ForgetPassword';
import ResetPassword from './Pages/User/ResetPassword';
import { HeaderProvider } from './context/header';
import Resend from './Pages/User/Resend';



function App() {
  return (
    <div className="App">
     
        <HeaderProvider>
          <Header/>
          
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contactus/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/items' element={<Items/>}/>
            <Route path='/adminform' element={<AdminForm/>}/>
            <Route path='/productdetails' element={<ProductDetails/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/orderdetails' element={<Orders/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/userorders' element={<OrderDetails/>}/>
            <Route path='/forgetpassword' element={<ForgetPassword/>}/>
            <Route path='/resetpassword/:token' element={<ResetPassword/>}/>
            <Route path='/resendmail' element={<Resend/>}/>
          </Routes>
          <Footer/>
       
        </HeaderProvider>
    </div>
  );
}

export default App;
