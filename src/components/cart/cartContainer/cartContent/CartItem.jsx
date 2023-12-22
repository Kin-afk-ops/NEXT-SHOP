const CartItem = () => {
  return (
    <li className="cart__content--container-item row no-gutters">
      <div className="cart__content--container-item-input display__flex--center c-1">
        <input type="checkbox" />
      </div>
      {/* <img className="img__main c-1" alt="" /> */}
      <div className="cart__content--container-item-info c-4">
        <p className="info__title"></p>
        <div className="info__money">
          <p className="info__money--all"> đ</p>
          <p className="info__money--discount"> đ</p>
        </div>
      </div>
      <div className="cart__content--container-item-quality display__flex--center c-2">
        <div></div>
      </div>

      <div className="cart__content--container-item-money display__flex--center c-2">
        đ
      </div>
    </li>
  );
};

export default CartItem;
