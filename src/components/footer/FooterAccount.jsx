"use client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./footer.css";
import "./responsive.css";
const FooterAccount = () => {
  const [checkUser, setCheckUser] = useState(false);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      setCheckUser(true);
    } else {
      setCheckUser(false);
    }
  }, [user]);

  return (
    <>
      {checkUser && (
        <div className="col l-4 m-12 s-4 footer__container--right-item">
          <p className="footer__container--right-title">TÀI KHOẢN CỦA TÔI</p>
          <ul>
            <Link href="/khach-hang/ho-so" className="link">
              <li>Thay đổi thông tin</li>
            </Link>
            <Link href="/khach-hang/thong-tin" className="link">
              <li>Chi tiết tài khoản</li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default FooterAccount;
