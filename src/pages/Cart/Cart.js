import Hero from "../../components/Hero/Hero";
import { useCart } from "../../contexts/CartContext/Cart";
import "./Style/Cart.scss";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import ItemsCounter from "../../components/ItemsCounter/ItemsCounter";

const Cart = () => {
  const {
    cart,
    total_price,
    shipping_fee,
    clearCart,
    removeCartItem,
    toggleAmount,
  } = useCart();

  const increaseAmount = (id, amount) => {
    const changedAmount = amount + 1;
    toggleAmount(id, changedAmount);
  };
  const decreaseAmount = (id, amount) => {
    let changedAmount = amount - 1;
    if (changedAmount < 1) {
      changedAmount = 1;
    }
    toggleAmount(id, changedAmount);
  };

  return (
    <div>
      <Hero page={"Cart"} />

      {cart.length > 0 ? (
        <section className={"cart-items"}>
          <div className={"cart-item-header"}>
            <p>Item</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
            <p></p>
          </div>
          <hr />
          <br />
          {cart?.map((cartItem) => {
            const { id, image, name, color, amount, price } = cartItem;
            const formattedPrice = Number(price / 100).toFixed(2);
            return (
              <div key={id} className={"cart-item"}>
                <div className={"cart-item-basic-details"}>
                  <img className={"cart-image"} src={image} alt="cart-item" />
                  <div className={"cart-name-colors"}>
                    <p className={"cart-name"}>{name}</p>
                    <div>
                      <p className={"colors-text"}>color</p>

                      <div
                        key={color}
                        className={"cart-item-color"}
                        style={{ background: color }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={"cart-price"}>{formattedPrice} $</div>
                <div className={"cart-quantity"}>
                  <ItemsCounter
                    id={id}
                    increment={increaseAmount}
                    decrement={decreaseAmount}
                    amount={amount}
                  />
                </div>
                <div className={"cart-subtotal"}>
                  {Number(formattedPrice * amount).toFixed(2)} $
                </div>

                <div className={"cart-delete-item"}>
                  <FiTrash
                    size={"22"}
                    className={"trash-icon"}
                    onClick={() => removeCartItem(id)}
                  />
                </div>
              </div>
            );
          })}
          <hr />

          <div className={"cart-bottom-btns"}>
            <Link to={"/"}>
              <button className={"continue-btn"}>Continue Shopping</button>
            </Link>
            {cart.length > 0 && (
              <button className={"btn"} onClick={clearCart}>
                Clear cart
              </button>
            )}
          </div>
          <section className={"cart-summary"}>
            <br />
            <strong>Subtotal : {total_price} $</strong>
            <p>Shipping fee : {shipping_fee} $</p>
            <hr />

            <h3>Order total: {total_price + shipping_fee} $</h3>
          </section>
        </section>
      ) : (
        <section className={"cart-empty"}>
          <h3>Cart is empty</h3>
          <Link to={"/"}>
            <button className={"btn"}> Fill it</button>
          </Link>
        </section>
      )}
    </div>
  );
};
export default Cart;
