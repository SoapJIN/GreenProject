import { Link } from "react-router-dom";

function RelatedProduct(props) {
  const { item } = props;
  const { id, imgUrl, itemName, price } = item;

  let percentOff;
  let offPrice = `${price}원`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{price}원</del>
        {price - (props.percentOff * price) / 100}원
      </>
    );
  }

  return (
    <Link
      to={`/products/${id}`}
      state={{ id, itemName, price, imgUrl }}
      className="col text-decoration-none"
      replace
    >
      <div className="card shadow-sm">
        {percentOff}
        <img className="card-img-top bg-dark cover h-96" alt="" src={imgUrl} />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {itemName}
          </h5>
          <p className="card-text text-center text-muted">{offPrice}</p>
        </div>
      </div>
    </Link>
  );
}

export default RelatedProduct;
