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
import ProductSellerList from "./products/ProductSellerList";
import Edit from "./member/Edit";
import NoticeQnA from "./notice/NoticeQnA.js";
import NoticeContact from "./notice/NoticeContact";
import ContactForm from "./notice/ContactForm";
import NoticeDetail from "./notice/noticeDetail/NoticeDetail";
import NotiCreateAndModify from "./notice/NotiCreateAndModify";
import NoticeMain from "./notice/NoticeMain";
import QnaDetail from "./notice/qnaDetail/QnaDetail";
import ListBoardComponent from "./board/ListBoardComponent";
import CreateBoardComponent from "./board/CreateBoardComponent";
import ReadBoardComponent from "./board/ReadBoardComponent";

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
        <Route path="/member/edit/:email" element={<Edit />}></Route>
        <Route path="/member/mypage" element={<MyPage />}></Route>
        <Route path="/member/signup" element={<SignUp />}></Route>
        <Route path="/member/logout" element={<Logout />}></Route>
        <Route path="/member/error" element={<Error />}></Route>
        <Route
          path="/productSellerList"
          element={<ProductSellerList />}
        ></Route>
        <Route path="/notice/contact" element={<NoticeContact />}></Route>
        <Route path="/notice/qna" element={<NoticeQnA />}></Route>
        <Route path="/notice/contactform" element={<ContactForm />}></Route>
        <Route path="/notice/main" element={<NoticeMain />}></Route>
        <Route path="/notice/main/:page" element={<NoticeMain />}></Route>
        <Route path="/notice/detail/:noticeId" element={<NoticeDetail />} />
        <Route
          path="/notice/create/:noticeId"
          element={<NotiCreateAndModify />}
        />
        <Route path="/notice/qnadetail/:qnaId" element={<QnaDetail />} />

        <Route path="/board" element={<ListBoardComponent />}></Route>
        <Route path="/board/key/" element={<ListBoardComponent />}></Route>
        <Route
          path="/board/key/:keyword/:searchType"
          element={<ListBoardComponent />}
        ></Route>
        <Route
          path="/createboard/:bno"
          element={<CreateBoardComponent />}
        ></Route>
        <Route path="/readboard/:bno" element={<ReadBoardComponent />}></Route>
      </Routes>
    </Template>
  );
}

// react-router-dom
// url에 도메인 + /products 를 입력하게 되면 그 부분으로 이동합니다.
// 템플릿은 항상 가져가면서 안에 있는 내용이 url에 따라 바뀐다는 의미
export default App;
