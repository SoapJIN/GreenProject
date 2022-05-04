import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function Header() {

  const [openedDrawer, setOpenedDrawer] = useState(false) // useState 변수 선언 토글을 하기 위해 처음을 false 선언

  const item = useSelector(cart => cart.basket);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer); // 토글바를 내렸다가 올렸다 하기 위한 함수 선언
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false) // 네비게이션 바를 끄기 위해 설정
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>  {/* "/"로 이동합니다. */}
            {/* 링크는 a태그 처럼 링크를 연결해주지만 다른 개념이다
            브라우저의 주소만 바꾸고 새로 불러오지 않기 위해 링크사용 */}
            <FontAwesomeIcon
              icon={"shop"}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
            {/* 화면 크기에 따라서 보여줄지 안보여줄시 정하는 거임  */}
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
            </ul>
            <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
              <Link to="/shoppingbasket">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{item.length}</span>
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
                  <li>
                    <Link to="/login" className="dropdown-item" onClick={changeNav}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="dropdown-item" onClick={changeNav}>
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
