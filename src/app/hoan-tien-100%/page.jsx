import "./page.css";

const page = () => {
  return (
    <div className="main__container footer__content">
      <section id="chinh-sach-hoan-tien">
        <h2 className="main__title">Chính sách hoàn tiền</h2>
        <p>
          Tại <strong>Toidocsach</strong>, sự hài lòng của khách hàng luôn được
          đặt lên hàng đầu. Chính vì vậy, chúng tôi áp dụng chính sách{" "}
          <strong>hoàn tiền 100%</strong> nếu quý khách không hài lòng với sản
          phẩm nhận được. Chính sách này giúp đảm bảo quyền lợi của khách hàng
          trong quá trình mua sắm trực tuyến.
        </p>
        <p>Chính sách hoàn tiền áp dụng cho các trường hợp sau:</p>
        <ul>
          <li>Sản phẩm không đúng như mô tả trên trang web.</li>
          <li>Sản phẩm bị lỗi do nhà sản xuất.</li>
          <li>Sản phẩm bị hư hại trong quá trình vận chuyển.</li>
        </ul>
      </section>

      <section id="dieu-kien-hoan-tien">
        <h2 className="main__title">Điều kiện hoàn tiền</h2>
        <p>
          Quý khách có thể yêu cầu hoàn tiền khi sản phẩm đáp ứng các điều kiện
          sau:
        </p>
        <ul>
          <li>
            Sản phẩm chưa qua sử dụng, còn nguyên vẹn và đầy đủ các phụ kiện kèm
            theo (nếu có).
          </li>
          <li>
            Yêu cầu hoàn tiền phải được gửi trong vòng <strong>7 ngày</strong>{" "}
            kể từ ngày nhận hàng.
          </li>
          <li>Sản phẩm bị lỗi hoặc không đúng mô tả như đã đặt mua.</li>
        </ul>
        <p>
          Nếu sản phẩm đã được sử dụng hoặc không còn đủ điều kiện để đổi trả,
          chúng tôi rất tiếc không thể áp dụng chính sách hoàn tiền.
        </p>
      </section>

      <section id="quy-trinh-hoan-tien">
        <h2 className="main__title">Quy trình hoàn tiền</h2>
        <p>
          Để yêu cầu hoàn tiền, quý khách vui lòng thực hiện theo các bước sau:
        </p>
        <ol>
          <li>
            Liên hệ với bộ phận chăm sóc khách hàng của Toidocsach qua email
            hoặc số điện thoại, cung cấp thông tin đơn hàng và lý do yêu cầu
            hoàn tiền.
          </li>
          <li>Gửi sản phẩm về kho của chúng tôi để kiểm tra tình trạng.</li>
          <li>
            Sau khi kiểm tra và xác nhận yêu cầu, chúng tôi sẽ tiến hành hoàn
            tiền 100% giá trị đơn hàng trong vòng{" "}
            <strong>3-5 ngày làm việc</strong> qua phương thức thanh toán mà quý
            khách đã sử dụng.
          </li>
        </ol>
        <p>
          Chúng tôi luôn cố gắng xử lý các yêu cầu hoàn tiền nhanh chóng và
          chính xác, đảm bảo quyền lợi của khách hàng.
        </p>
      </section>
    </div>
  );
};

export default page;
