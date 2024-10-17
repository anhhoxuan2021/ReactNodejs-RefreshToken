import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout';
import UserLogin from './pages/users/Login';
import AddProduct from './pages/admin/AddProduct';

import "./fontawasome"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
           <Route path="/login" element={<UserLogin />} />
           <Route path="/admin/product" element={<AddProduct  />} />
        </Route>       
      </Routes>
    </BrowserRouter>
  );
}
