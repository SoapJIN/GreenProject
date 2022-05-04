import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          제품들을 아래에 진열해서 나타내기!
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            상제 제품군으로 이동합니다!
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">상품들</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {Array.from({ length: 6 }, (_, i) => {
            return <FeatureProduct key={i} />;
          })}
          {/* 유사 객체 배열이나 반복 가능한 객체들을 얕게 복사하여 새로운 Array 객체를 만듬
          즉 여기서는 길이가 6인 새로운 array객체를 만드는데 _는 자기자신 i는 인덱스 
          <FeatureProduct를 6번 반복하고 키값으로 인덱스를 준것 일반적인 map과 유사하다고 볼 수 있음 */}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
