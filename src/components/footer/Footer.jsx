import Image from "next/image";
import logo from "../../assets/images/toi_doc_sach_logo.png";
import "./footer.css";
import "./responsive.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer main__container">
      <div className="grid wide">
        <div className="row footer__container">
          <div className="col l-3 m-3 s-12 footer__container--left">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                width={220}
                height={39}
                style={{
                  marginBottom: "30px",
                }}
              />
            </Link>
            <p>
              Lầu 3, số 4/9A đường Mậu Thân, phường Xuân Khánh, quận Ninh Kiều,
              thành phố Cần Thơ.
            </p>
            <p>
              <span className="copyright">toidocsach</span> nhận đặt hàng trực
              tuyến và giao hàng tận nơi.
            </p>

            <div className="footer__container--icon">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-tiktok"></i>
            </div>
          </div>

          <div className=" l-9 c-9 m-9 s-12 footer__container--right ">
            <div className="row">
              <div className="col l-4 m-12 s-4 footer__container--right-item">
                <p className="footer__container--right-title">DỊCH VỤ</p>

                <ul>
                  <li>
                    Giới thiệu về <b>toidocsach</b>
                  </li>
                </ul>
              </div>

              <div className="col l-4 m-12 s-4 footer__container--right-item">
                <p className="footer__container--right-title">HỖ TRỢ</p>
                <ul>
                  <li>Giao hàng đi toàn quốc</li>
                  <li>Đổi trả trong 7 ngày</li>
                  <li>Hoàn tiền 100%</li>
                  <li>Thanh toán băng tiền mặt, VNPAY và MOMO</li>
                </ul>
              </div>

              <div className="col l-4 m-12 s-4 footer__container--right-item">
                <p className="footer__container--right-title">
                  TÀI KHOẢN CỦA TÔI
                </p>
                <ul>
                  <Link href="/khach-hang/ho-so" className="link">
                    <li>Thay đổi thông tin</li>
                  </Link>
                  <Link href="/khach-hang/thong-tin" className="link">
                    <li>Chi tiết tài khoản</li>
                  </Link>
                </ul>
              </div>
            </div>

            <div className="footer__container--contact grid">
              <div className="footer__container--right-title">LIÊN HỆ</div>
              <ul className="row">
                <li className="col l-4 s-12">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>4/9A, Mậu Thân, Ninh Kiều, Cần Thơ</span>
                </li>

                <li className="col l-4 s-12">
                  <i className="fa-solid fa-envelope"></i>
                  <span>linhb2110130@student.ctu.edu.vn</span>
                </li>

                <li className="col l-4 s-12">
                  <i className="fa-solid fa-phone"></i>
                  <span>(+84) 589443320</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr />
        <div className="footer__copyright">
          <span> &copy; Bản quyền thuộc về &nbsp;</span>

          <span className="copyright"> toidocsach</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
