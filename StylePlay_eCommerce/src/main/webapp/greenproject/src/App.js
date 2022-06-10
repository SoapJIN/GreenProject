import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import React from "react";
import Cart from "./shoppingcart/Cart";
import ProductForm from "./products/ProductForm";
import ProductModify from "./products/ProductModify";
import Logout from "./member/Logout";
import Error from "./member/Error";
import Login from "./member/Login";
import SignUp from "./member/SignUp";
import Order from "./order/Order";
import OrderHistory from "./order/OrderHistory";
import MyPage from "./member/MyPage";

function App() {
  return (
    <Template>
      <Routes>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/products/:slug" element={<ProductDetail />}></Route>
        <Route path="/products/cate/:id" element={<ProductList />}></Route>
        <Route path="/shoppingbasket" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/orders" element={<OrderHistory />}></Route>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/productForm" element={<ProductForm />}></Route>
        <Route path="/productModify" element={<ProductModify />}></Route>
        <Route path="/member/login" element={<Login />}></Route>
        <Route path="/member/login/:id" element={<Login />}></Route>
        <Route path="/member/mypage" element={<MyPage />}></Route>
        <Route path="/member/signup" element={<SignUp />}></Route>
        <Route path="/member/logout" element={<Logout />}></Route>
        <Route path="/member/error" element={<Error />}></Route>
      </Routes>
    </Template>
  );
}

// react-router-dom
// url에 도메인 + /products 를 입력하게 되면 그 부분으로 이동합니다.
// 템플릿은 항상 가져가면서 안에 있는 내용이 url에 따라 바뀐다는 의미
export default App;
