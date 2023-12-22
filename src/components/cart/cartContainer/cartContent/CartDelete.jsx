const CartDelete = () => {
  return (
    <div class="customer__modal hidden">
      <div class="customer__modal--title">
        Bạn muốn xoá sản phẩm này trong giỏ hàng
      </div>
      <div class="customer__modal--content">
        <button class="customer__modal--hide">Đóng</button>
        <button class="customer__modal--agree">Đồng ý</button>
      </div>
    </div>
  );
};

export default CartDelete;
