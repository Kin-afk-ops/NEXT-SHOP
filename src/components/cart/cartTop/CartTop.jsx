import "./cartTop.css";

const CartTop = () => {
  return (
    <div className="main__container cart__top">
      <h1 className="main__title cart__top--title">
        <i className="fa-solid fa-cart-shopping"></i>
        Giỏ hàng
        <p>(10 sản phẩm)</p>
      </h1>
    </div>
  );
};

export default CartTop;
