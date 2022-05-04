import BannerZero from "./banner-0.jpg";
import BannerOne from "./banner-1.jpg";
import BannerTwo from "./banner-2.jpg";

function BannerIncidator(props) {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}  
      className={props.active ? "active" : ""}
      aria-current={props.active}
    />
  );
}
// Carousel 를 사용하기 위한 버튼 내의 설정들이다.  
//  data-bs-target는 캐러셀 요소에 있는 속성을 가르키고 있다 (ID)
// data-bs-slide-to는 props.index를 주어 props로 넘어오는 인덱스에 해당하는 페이지를 보여주기 위해
// active는 하나의 슬라이드에 무조건 활성화 시켜줘야함
// 현재 페이지의 경우 aria-current="page"를 사용하거나 세트의 현재 항목의 경우 aria-current="true"를 사용하여 현재 항목을 나타냅니다.
function BannerImage(props) {
  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
    >
      {/* data-bs-interval=""하면 .carousel-item다음 항목으로 자동 순환되는 지연 시간을 변경할 수 있다*/}
      <div
        className="ratio"
        style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
      <div className="carousel-caption d-none d-lg-block">
        <h5>그린 프로젝트 쇼핑물</h5>
        <p>여기다가 아무거나 적어넣을 수 있어요!</p>
      </div>
    </div>
  );
}
// https://getbootstrap.com/docs/5.0/components/carousel/#with-captions 참고하기!
function Banner() {
  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "56px" }}
    >
      <div className="carousel-indicators">
        <BannerIncidator index="0" active={true} />
        <BannerIncidator index="1" />
        <BannerIncidator index="2" />
      </div>
      <div className="carousel-inner">
        <BannerImage image={BannerZero} active={true} />
        <BannerImage image={BannerOne} />
        <BannerImage image={BannerTwo} />
      </div>
    </div>
  );
}

export default Banner;
