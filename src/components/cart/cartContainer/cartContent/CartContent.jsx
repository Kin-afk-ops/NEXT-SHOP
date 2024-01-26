import CartDelete from "./CartDelete";
import CartItem from "./CartItem";
import "./cartContent.css";

const CartContent = ({ cart }) => {
  console.log(cart);

  return (
    <div className="cart__content main__container">
      <div className="cart__content--title main__title row no-gutters">
        <input type="checkbox" className="c-1" />
        <p className="c-5">Chọn tất cả sản phẩm</p>
        <p className="c-2 display__flex--center">Số lượng</p>
        <p className="c-2 display__flex--center">Thành tiền</p>
        <div className="cart__content--container-item-delete display__flex--center c-2">
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>
      <hr />

      <div className="cart__content--container">
        <ul className="cart__content--container-list">
          {cart?.map((c, index) => (
            <li
              className="cart__content--container-item row no-gutters"
              key={c.id}
            >
              <CartItem cartItem={c} />
            </li>
          ))}
        </ul>
      </div>
      <CartDelete />
    </div>
  );
};

export default CartContent;
