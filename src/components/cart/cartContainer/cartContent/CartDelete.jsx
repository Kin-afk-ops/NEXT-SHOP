const CartDelete = () => {
  return (
    <div className="customer__modal hidden">
      <div className="customer__modal--title">
        Bạn muốn xoá sản phẩm này trong giỏ hàng
      </div>
      <div className="customer__modal--content">
        <button className="customer__modal--hide">Đóng</button>
        <button className="customer__modal--agree">Đồng ý</button>
      </div>
    </div>
  );
};

export default CartDelete;
