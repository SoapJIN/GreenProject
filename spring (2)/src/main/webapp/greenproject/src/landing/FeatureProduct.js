import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";

function FeatureProduct() {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt=""
          src={Image}
        />
        <div className="card-body">
          <h5 className="card-title text-center">iPhone X cover</h5>
          <p className="card-text text-center text-muted">10000 원</p>
          <div className="d-grid gap-2">
            <Link to="/products/1" className="btn btn-outline-dark" replace>
              상세 보기
            </Link>
            {/* 이게 지금 처음 화면에서 Detail를 누른다면 /products/1 이동하는데 이건 우리가 수정해서 구현해야할 필요가 있음! */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
