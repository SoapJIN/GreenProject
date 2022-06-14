import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Landing() {
  const [message, setMessage] = useState({
    content: [
      {
        itemName: "",
        price: 0,
        id: 0,
        imgUrl: "",
      },
    ],
  });

  //로그인 데이터 가져옴!!
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/main2");
      console.log("response_user:", response);
    };
    fetchData();
  }, []);

  //아이템들 데이터 가져옴!
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/main/0/6");
      setMessage(response.data);
    };
    fetchData();
  }, []); // 페이지가 바뀔때마다 해당 페이지로 재 렌더링
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            상제 제품군으로 이동
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">상품들</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {message["content"].map((content, index) => (
            <FeatureProduct
              key={index}
              price={content.price}
              title={content.itemName}
              image={content.imgUrl}
              id={content.id}
            />
          ))}
          {/* 유사 객체 배열이나 반복 가능한 객체들을 얕게 복사하여 새로운 Array 객체를 만듬
          즉 여기서는 길이가 6인 새로운 array객체를 만드는데 _는 자기자신 i는 인덱스 
          <FeatureProduct를 6번 반복하고 키값으로 인덱스를 준것 일반적인 map과 유사하다고 볼 수 있음 */}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="https://www.facebook.com/" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="https://www.instagram.com">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="https://twitter.com" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
