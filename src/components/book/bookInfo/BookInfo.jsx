import "./bookInfo.css";
import "../responsive.css";

const BookInfo = ({ infoBook }) => {
  return (
    <div className="product__info main__container">
      <h2 className="main__title">Thông tin sản phẩm</h2>

      <div className="product__info--content row no-gutters">
        <div className=" l-6 m-12 s-12 row no-gutters product__info--top">
          <div className=" c-6 product__info--top-left">
            <p>Tên nhà cung cấp</p>
            <p>Tác giả</p>
            <p>Nhà xuất bản</p>
            <p>Năm xuất bản</p>
            <p>Trọng lượng(gr)</p>
            <p>Kích thước bao bì</p>
            <p>Số trang</p>
            <p>Hình thức</p>
          </div>
          <div className=" c-6">
            <p>{infoBook.infoBook.supplier}</p>
            <p>{infoBook.infoBook.auth}</p>
            <p>{infoBook.infoBook.publisher}</p>
            <p>{infoBook.infoBook.publishingYear}</p>
            <p>{infoBook.infoBook.weight}</p>
            <p>{infoBook.infoBook.size}</p>
            <p>{infoBook.infoBook.numberPage}</p>
            <p>{infoBook.infoBook.form}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default BookInfo;
