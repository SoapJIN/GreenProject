import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserCart } from "../shoppingcart/action/action";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false); // useState 변수 선언 토글을 하기 위해 처음을 false 선언
  const [cartItemsMore, setCartItemsMore] = useState([]);
  const [user_data, setUser_data] = useState({});

  useMemo(() => {
    const fetchData = async () => {
      const response = await axios.get("/main2");
      console.log("response_user:", response.data);
      setUser_data(response.data);
    };
    fetchData();
  }, []);

  const items = useSelector((state) => state.basket.basket);
  console.log("basket:", items);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer); // 토글바를 내렸다가 올렸다 하기 위한 함수 선언
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false); // 네비게이션 바를 끄기 위해 설정
    }
  }

  const logout = () => {
    //로그 아웃시 호출하는 함수
    localStorage.removeItem("access"); //로그아웃하면 key 삭제
    localStorage.removeItem("user");
    window.location.href = "/member/logout";
    localStorage.clear();
    console.log("3) remove", localStorage.getItem("key"));
  };

  //마이페이지
  const mypage = () => {
    window.location.href = "/member/mypage";
  };

  //email에 맞는 cartItemS 가져오기
  useEffect(() => {
    const getCartItems = async () => {
      const response = await axios.get("/cart");
      console.log("Login_cartData", response.data);
      setCartItemsMore(response.data);
    };
    getCartItems();
  }, []);

  const dispatch = useDispatch();

  //로그인한 카트데이터 reducer state.basket.basket에 저장
  useEffect(() => {
    if (cartItemsMore.length !== 0) {
      cartItemsMore.map((carItem) =>
        dispatch(
          getUserCart(
            carItem.itemId,
            carItem.itemNm,
            carItem.price,
            carItem.imgUrl,
            carItem.count,
            carItem.cartItemId
          )
        )
      );
    }
  }, [cartItemsMore, dispatch]);

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            {" "}
            {/* "/"로 이동합니다. */}
            {/* 링크는 a태그 처럼 링크를 연결해주지만 다른 개념이다
            브라우저의 주소만 바꾸고 새로 불러오지 않기 위해 링크사용 */}
            <span className="ms-2 h5">Style Play</span>
          </Link>

          <div
            className={
              "navbar-collapse offcanvas-collapse " +
              (openedDrawer ? "open" : "")
            }
          >
            {/* 화면 크기에 따라서 보여줄지 안보여줄시 정하는 거임  */}
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link"
                  replace
                  onClick={changeNav}
                >
                  Explore
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-outline-dark me-3 d-none d-lg-inline"
            >
              <Link state={{ user_name: user_data.name }} to="/shoppingbasket">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark">
                  {items.length}
                </span>
                {/* 현재 장바구니에 있는 갯수 이건 우리가 구현해야함 */}
              </Link>
            </button>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {user_data.email && <li>　{user_data.email}</li>}
                  <li>
                    <Link
                      to="/member/signup" //회원가입 창으로 이동
                      className="dropdown-item"
                      onClick={changeNav}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                      　sign up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/member/login"
                      className="dropdown-item"
                      onClick={changeNav}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                      　login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/member/logout" //로그아웃
                      className="dropdown-item"
                      onClick={logout}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                      　logout
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link
                      to="/member/mypage" //마이페이지
                      className="dropdown-item"
                      onClick={mypage}
                    >
                      <FontAwesomeIcon icon="fa-solid fa-user-check" />
                      　mypage
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      state={{ user_name: user_data.name }}
                      className="dropdown-item"
                    >
                      <FontAwesomeIcon icon="fa-solid fa-pager" />
                      　OrderHistory
                    </Link>
                  </li>
                  {/* {member.role === "admin" &&  */}
                  <hr />
                  <li>
                    <Link to="/productForm" className="dropdown-item">
                      <FontAwesomeIcon icon="fa-solid fa-user-tie" />
                      　productForm
                    </Link>
                  </li>
                  <li>
                    <Link to="/productModify" className="dropdown-item">
                      <FontAwesomeIcon icon="fa-solid fa-user-tie" />
                      　productModify
                    </Link>
                  </li>
                  {/* } */}
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button
              className="navbar-toggler p-0 border-0 ms-3"
              type="button"
              onClick={toggleDrawer}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
