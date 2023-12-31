import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductsContext/Products";
import { useCart } from "../../contexts/CartContext/Cart";
import Hero from "../../components/Hero/Hero";
import ItemsCounter from "../../components/ItemsCounter/ItemsCounter";
import { FiCheck } from "react-icons/fi";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import "./Styles/SingleProduct.scss";

const SingleProduct = () => {
  const { addToCart } = useCart();
  const {
    fetchSingleProduct,
    productDetails,
    errorProductDetail,
    loadingProductDetail,
  } = useProducts();
  const { name, image, description, colors, price } = productDetails;
  const formattedPrice = Number(price / 100).toFixed(2);
  const [defaultColor, setDefaultColor] = useState("");
  const [amount, setAmount] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (colors?.length > 0) {
      setDefaultColor(colors[0]);
    }
  }, [colors]);
  useEffect(() => {
    fetchSingleProduct(id);
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    if (errorProductDetail) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [errorProductDetail, navigate]);

  const increaseAmount = () => {
    setAmount((amount) => {
      return amount + 1;
    });
  };
  const decreaseAmount = () => {
    setAmount((amount) => {
      return amount - 1;
    });
  };

  return (
    <>
      {errorProductDetail ? (
        <Error />
      ) : (
        <>
          <Hero page={id} />

          {loadingProductDetail ? (
            <Loading />
          ) : (
            <div className={"product-details"}>
              <section className={"product-image-container"}>
                <img className={"product-image"} src={image} alt="product" />
              </section>
              <section className={"product-details-add-to-cart"}>
                <h3 className={"product-name"}>{name}</h3>
                <h4>{formattedPrice}$</h4>
                <p className={"product-description"}>{description}</p>

                <section className={"color-cotainer"}>
                  <span className="color-text">
                    {colors?.length > 1 ? "Colors" : "Color"}
                  </span>
                  <ul>
                    {colors?.map((color, index) => (
                      <li
                        key={color + index}
                        onClick={() => setDefaultColor(color)}
                      >
                        <div
                          key={color}
                          className={"product-color"}
                          style={{ background: color }}
                        >
                          {color === defaultColor && (
                            <FiCheck color={"white"} />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className={"add-to-cart"}>
                  <ItemsCounter
                    amount={amount}
                    increment={increaseAmount}
                    decrement={decreaseAmount}
                  />

                  <Link
                    to={"/cart"}
                    onClick={() =>
                      addToCart({
                        id,
                        name,
                        description,
                        image,
                        defaultColor,
                        amount,
                        productDetails,
                      })
                    }
                  >
                    <button className={"btn"}>Add to cart</button>
                  </Link>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default SingleProduct;
