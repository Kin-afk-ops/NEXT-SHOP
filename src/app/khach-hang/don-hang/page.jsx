import "./page.css";

const CustomerContentOrder = () => {
  return (
    <div class="content__order main__container">
      {/* <p class="content__order--empty" >Không có đơn hàng!</p> */}

      <div>
        <ul class="content__order--list">
          <li class="content__order--list-item row">
            {/* <img
          class="img__main"
          src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935278607311.jpg"
          alt=""
        /> */}
            <div class="content__order--desc c-8">
              <p class="content__order--title">
                Không Diệt Không Sinh Đừng Sợ Hãi (Tái Bản 2022)
              </p>

              <p class="content__order--quality">Số lượng: 1</p>
            </div>

            <div class="content__order--price c-2">66.000đ</div>
          </li>
          <hr />
        </ul>
        <h2>
          Xin lỗi! Chúng tôi chưa phát triển tính năng xem thông tin đơn hàng
          <br />
          Tính năng sẽ có trong phiên bản kế tiếp
        </h2>

        <p class="main__title">Trạng thái đơn hàng</p>

        <div class="content__order--btn">
          <button class="content__order--btn-delete">Huỷ đơn hàng</button>
        </div>
      </div>
      <div class="customer__modal hidden">
        <div class="customer__modal--title">Bạn muốn huỷ đơn hàng này?</div>
        <div class="customer__modal--content">
          <button class="customer__modal--hide">Đóng</button>
          <button class="customer__modal--agree">Huỷ đơn hàng</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentOrder;
