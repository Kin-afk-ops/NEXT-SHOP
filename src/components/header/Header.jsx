import Link from "next/link";
import Image from "next/image";
import "./header.css";
import logo from "../../assets/images/toi_doc_sach_logo.png";
import avatar from "../../assets/images/default_avatar.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header__content">
        <div className="header__left">
          <Link className="link header__logo--img" href="/">
            <Image src={logo} alt="" width={220} height={39} />
          </Link>
        </div>

        <div className="header__center">
          <input
            type="text"
            className="header__center--input"
            placeholder="Tìm kiếm sản phẩm mong muốn..."
          />
          <div className="header__center--icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="header__right">
          <Link href="/bai-viet" className="link">
            <div className="header__icon">
              <i className="fa-solid fa-square-pen"></i>
              <span>Bài viết</span>
              <div className="header__icon--total header__icon--total-cart">
                3
              </div>
            </div>
          </Link>

          <div className="header__icon">
            <i className="fa-solid fa-bell"></i>
            <span>Thông báo</span>
            <div className="header__icon--total"></div>

            <ul className="header__icon--notify-list">
              <div className="header__icon--notify-header">
                <span className="header__icon--notify-title"> Thông báo </span>
                <Link className="link" href="/khach-hang/thong-bao">
                  <span className="header__icon--notify-all">Xem tất cả</span>
                </Link>
              </div>
              <hr />
              <li className="header__icon--notify-li">
                <Link href="/" className="link display__flex--center">
                  <i className="header__icon--notify-li-icon fa-solid fa-triangle-exclamation"></i>
                  <div className="header__icon--notify-li-wrap">
                    <span className="header__icon--notify-li-title"></span>
                    <span className="header__icon--notify-li-content"></span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/gio-hang/abc" className="link">
            <div className="header__icon">
              <i className="fa-solid fa-cart-shopping"></i>
              <span> Giỏ hàng</span>
              <div className="header__icon--total header__icon--total-cart">
                3
              </div>
            </div>
          </Link>

          <div className="header__icon">
            <i className="fa-solid fa-user"></i>
            <span>Tài khoản</span>

            <ul className="header__icon--user-list">
              <Link href="/khach-hang/thong-tin" className="link">
                <div className="header__icon--user-header">
                  <Image
                    src={avatar}
                    alt=""
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                    }}
                  />
                  <div>
                    <p className="header__icon--user-name"></p>
                    <p className="header__icon--user-email"></p>
                  </div>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </Link>
              <hr v-if="user" />
              <Link href="/khach-hang/don-hang" className="link">
                <li className="header__icon--user-li">
                  <i className="fa-solid fa-clipboard"></i>
                  <span className="header__icon--user-li-title">
                    Đơn hàng của tôi
                  </span>
                </li>
              </Link>
              <hr />

              <Link href="/tai-khoan/dang-nhap" className="link">
                <li className="header__icon--user-li">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span className="header__icon--user-li-title">Đăng nhập</span>
                </li>
              </Link>
              <hr />

              <li className="header__icon--user-li">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className="header__icon--user-li-title">Đăng xuất</span>
              </li>
              <hr />

              <Link href="/tai-khoan/dang-ky" className="link" v-if="!user">
                <li className="header__icon--user-li">
                  <i className="fa-regular fa-address-card"></i>
                  <span className="header__icon--user-li-title">Đăng kí</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
