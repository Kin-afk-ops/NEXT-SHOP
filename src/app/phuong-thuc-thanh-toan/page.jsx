import "./page.css";

const page = () => {
  return (
    <div className="main__container footer__content">
      <section id="thanh-toan-tien-mat">
        <h2 className="main__title">Thanh toán bằng tiền mặt</h2>
        <p>
          <strong>Toidocsach</strong> cung cấp dịch vụ thanh toán bằng tiền mặt
          khi nhận hàng (COD) cho tất cả khách hàng trên toàn quốc. Quý khách có
          thể thanh toán trực tiếp cho nhân viên giao hàng ngay khi nhận được
          sản phẩm.
        </p>
        <p>
          <strong>Lưu ý:</strong> Quý khách vui lòng kiểm tra kỹ sản phẩm trước
          khi thanh toán để đảm bảo không có sai sót hoặc hư hỏng.
        </p>
      </section>

      <section id="thanh-toan-momo">
        <h2 className="main__title">Thanh toán qua MoMo</h2>
        <p>
          {/* Chúng tôi hỗ trợ thanh toán qua ví điện tử <strong>MoMo</strong>, một
          phương thức thanh toán nhanh chóng và tiện lợi. Để thanh toán bằng
          MoMo, quý khách chỉ cần thực hiện các bước sau: */}
          Đang phát triển
        </p>
        {/* <ol>
          <li>Chọn phương thức thanh toán MoMo khi đặt hàng trên website.</li>
          <li>
            Quét mã QR hoặc nhập số điện thoại MoMo để thực hiện thanh toán.
          </li>
          <li>
            Xác nhận giao dịch và hoàn tất thanh toán trong ứng dụng MoMo.
          </li>
        </ol>
        <p>
          MoMo là phương thức an toàn và tiện lợi, giúp quý khách hoàn tất thanh
          toán chỉ trong vài giây.
        </p> */}
      </section>

      <section id="thanh-toan-vnpay">
        <h2 className="main__title">Thanh toán qua VNPAY</h2>
        {/* <p>
          <strong>VNPAY</strong> là một giải pháp thanh toán điện tử được nhiều
          người dùng ưa chuộng. Quý khách có thể sử dụng VNPAY để thanh toán đơn
          hàng một cách nhanh chóng và an toàn. Các bước thanh toán bằng VNPAY:
        </p>
        <ol>
          <li>Chọn phương thức thanh toán VNPAY khi đặt hàng trên website.</li>
          <li>Quét mã QR qua ứng dụng ngân hàng hoặc VNPAY.</li>
          <li>Xác nhận giao dịch và hoàn tất thanh toán.</li>
        </ol>
        <p>
          Với VNPAY, quý khách có thể thực hiện thanh toán an toàn từ tài khoản
          ngân hàng mà không cần tiền mặt.
        </p> */}
        <p>Đang phát triển</p>
      </section>
    </div>
  );
};

export default page;
