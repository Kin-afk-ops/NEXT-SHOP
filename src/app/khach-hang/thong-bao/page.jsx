import Link from "next/link";
import "./page.css";

const CustomerContentNotification = () => {
  return (
    <div className="customer__notification col c-9 main__container">
      <ul className="customer__notification--list">
        <li className="customer__notification--item">
          <Link href="/" className="link">
            <p className="customer__notification--title"></p>

            <p className="customer__notification--content"></p>
          </Link>
          <i className="fa-solid fa-trash"></i>
        </li>
        <hr />
      </ul>

      <div v-else className="main__title">
        Không có thông báo
      </div>

      <div className="customer__modal hidden">
        <div className="customer__modal--title">
          Bạn chắc mình đã đọc thông báo quan trọng này
        </div>
        <div className="customer__modal--content">
          <button className="customer__modal--hide">Chưa</button>
          <button className="customer__modal--agree">Xoá thông báo</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentNotification;
