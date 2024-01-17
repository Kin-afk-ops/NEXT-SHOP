import "./page.css";

const CustomerContentOrder = () => {
  return (
    <div className="content__order main__container">
      {/* <p className="content__order--empty" >Không có đơn hàng!</p> */}

      <div>
        <ul className="content__order--list">
          <li className="content__order--list-item row">
            <img
              className="img__main"
              src="https://cdn0.fahasa.com/media/catalog/product/8/9/8935278607311.jpg"
              alt=""
              style={{
                marginLeft: "20px",
              }}
            />
            <div className="content__order--desc c-8">
              <p className="content__order--title">
                Không Diệt Không Sinh Đừng Sợ Hãi (Tái Bản 2022)
              </p>

              <p className="content__order--quality">Số lượng: 1</p>
            </div>

            <div className="content__order--price c-2">66.000đ</div>
          </li>
          <div className="order__action">
            <p className="main__title">Trạng thái đơn hàng</p>

            <div className="content__order--btn">
              <button className="content__order--btn-delete">
                Huỷ đơn hàng
              </button>
            </div>
          </div>
        </ul>
        <hr />
      </div>
      <div className="customer__modal hidden">
        <div className="customer__modal--title">Bạn muốn huỷ đơn hàng này?</div>
        <div className="customer__modal--content">
          <button className="customer__modal--hide">Đóng</button>
          <button className="customer__modal--agree">Huỷ đơn hàng</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentOrder;
