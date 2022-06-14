import { Link } from "react-router-dom";

function RelatedProduct(props) {
  const { item } = props;
  const { id, imgUrl, itemName, price } = item;

  return (
    <Link
      to={`/products/${id}`}
      state={{ id, itemName, price, imgUrl }}
      className="col text-decoration-none"
      replace
    >
      <div className="card shadow-sm">
        <img className="card-img-top bg-dark cover h-96" alt="" src={imgUrl} />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {itemName}
          </h5>
          <p className="card-text text-center text-muted">{price}원</p>
        </div>
      </div>
    </Link>
  );
}

export default RelatedProduct;
