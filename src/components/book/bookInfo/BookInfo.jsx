import "./bookInfo.css";

const BookInfo = () => {
  return (
    <div className="product__info main__container">
      <h2 className="main__title">Thông tin sản phẩm</h2>

      <div className="product__info--content row no-gutters">
        <div className="col c-6 row no-gutters product__info--top">
          <div className="col c-6 product__info--top-left">
            <p>Mã hàng</p>
            <p>Tên nhà cung cấp</p>
            <p>Tác giả</p>
            <p>Nhà xuất bản</p>
            <p>Năm xuất bản</p>
            <p>Trọng lượng</p>
            <p>Kích thước bao bì</p>
            <p>Số trang</p>
            <p>Hình thức</p>
          </div>
          <div className="col c-6">
            <p>Haha</p>
            <p> Haha</p>
            <p> Haha</p>
            <p> Haha</p>
            <p> Haha</p>
            <p> Haha</p>
            <p> Haha</p>
            <p> Haha</p>
            <p> Haha</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default BookInfo;
