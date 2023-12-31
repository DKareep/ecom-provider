import { memo } from "react";
import { Link } from "react-router-dom";

const Product = memo(
  ({ id, image, name, description, price, grid_view, total_products }) => {
    const formattedPrice = Number(price / 100).toFixed(2);
    if (grid_view) {
      return (
        <Link className={"link-unset"} to={`/${id}`}>
          <div className={"product-grid"}>
            <img className={"product-grid-image"} src={image} alt="product" />
            <p className={"product-grid-details"}>
              <span className={"product-grid-name"}>{name}</span>
              <span className={"product-grid-price"}>{formattedPrice}$</span>
            </p>
          </div>
        </Link>
      );
    }
    return (
      <Link className={"link-unset"} to={`/${id}`}>
        <div className={"product-list"}>
          <img className={"product-image"} src={image} alt="" />
          <div className={"product-list-details"}>
            <h3 className={"product-list-name"}>{name}</h3>
            <h2 className="product-list-price">{formattedPrice}$</h2>
            <p className={"product-list-description"}>{description}</p>
            <button className="btn">See more</button>
          </div>
        </div>
      </Link>
    );
  },
);
export default Product;
