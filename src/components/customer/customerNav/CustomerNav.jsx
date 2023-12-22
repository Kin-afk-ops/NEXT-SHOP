"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./customerNav.css";

const CustomerNav = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  return (
    <div className="customer__nav col c-3 main__container">
      <h1 className="customer__title">Tài khoản</h1>
      <hr />
      <div className="customer__nav--content">
        <ul>
          <li>
            <Link
              href="/khach-hang/thong-tin"
              className={
                slug === "thong-tin"
                  ? "customer__nav--router active"
                  : "customer__nav--router"
              }
            >
              Thông tin của bạn
            </Link>
          </li>
          <hr />

          <li>
            <Link
              href="/khach-hang/tai-khoan"
              className={
                slug === "tai-khoan"
                  ? "customer__nav--router active"
                  : "customer__nav--router"
              }
            >
              Chỉnh sửa tài khoản
            </Link>
          </li>
          <hr />

          <li>
            <Link
              href="/khach-hang/ho-so"
              className={
                slug === "ho-so"
                  ? "customer__nav--router active"
                  : "customer__nav--router"
              }
            >
              Chỉnh sửa hồ sơ
            </Link>
          </li>
          <hr />

          <li>
            <Link
              href="/khach-hang/don-hang"
              className={
                slug === "don-hang"
                  ? "customer__nav--router active"
                  : "customer__nav--router"
              }
            >
              Đơn hàng của tôi
            </Link>
          </li>
          <hr />

          <li>
            <Link
              href="/khach-hang/thong-bao"
              className={
                slug === "thong-bao"
                  ? "customer__nav--router active"
                  : "customer__nav--router"
              }
            >
              Thông báo
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerNav;
