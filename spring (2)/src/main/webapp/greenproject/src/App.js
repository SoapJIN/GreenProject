import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import React from 'react';
import Login from './login/Login'
import SignUp from "./login/SignUp";
import Cart from "./shoppingcart/Cart";


function App() {
  return (
      <Template>
        <Routes>
          <Route path="/products" element={<ProductList />}>
          </Route>
          <Route path="/products/:slug" element={<ProductDetail />}>
          </Route>
          <Route path="/shoppingbasket" element={<Cart/>}>
          </Route>
          <Route path="/" element={<Landing />}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/signup" element={<SignUp />}>
          </Route>

        </Routes>
      </Template>
  );
}

// react-router-dom
// url에 도메인 + /products 를 입력하게 되면 그 부분으로 이동합니다.
// 템플릿은 항상 가져가면서 안에 있는 내용이 url에 따라 바뀐다는 의미
export default App;
