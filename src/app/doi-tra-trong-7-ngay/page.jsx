import "./page.css";

const page = () => {
  return (
    <div className="main__container footer__content">
      <section id="chinh-sach-doi-tra">
        <h2 className="main__title">Chính sách đổi trả</h2>
        <p>
          Chúng tôi tại <strong>Toidocsach</strong> cam kết mang lại sự hài lòng
          cho khách hàng với các sản phẩm sách chất lượng cao. Nếu sản phẩm bạn
          nhận được không đúng như mô tả hoặc có lỗi từ nhà sản xuất, bạn có thể
          yêu cầu đổi trả trong vòng <strong>7 ngày</strong> kể từ ngày nhận
          hàng. Chính sách này áp dụng trên toàn quốc để đảm bảo quyền lợi cho
          tất cả khách hàng.
        </p>
      </section>

      <section id="dieu-kien-doi-tra">
        <h2 className="main__title">Điều kiện đổi trả</h2>
        <p>
          Để được chấp nhận đổi trả sản phẩm, vui lòng đảm bảo sản phẩm đáp ứng
          các điều kiện sau:
        </p>
        <ul>
          <li>
            Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và không bị hư hỏng
            do tác động bên ngoài sau khi nhận hàng.
          </li>
          <li>
            Hộp, bao bì sản phẩm còn nguyên và đầy đủ các phụ kiện đi kèm (nếu
            có).
          </li>
          <li>
            Yêu cầu đổi trả phải được gửi trong vòng 7 ngày kể từ khi nhận hàng
            (dựa trên thời gian ghi nhận của đơn vị vận chuyển).
          </li>
          <li>
            Sản phẩm lỗi do nhà sản xuất hoặc bị hư hại trong quá trình vận
            chuyển.
          </li>
        </ul>
      </section>

      <section id="quy-trinh-doi-tra">
        <h2 className="main__title">Quy trình đổi trả</h2>
        <p>
          Quý khách có thể thực hiện việc đổi trả sản phẩm theo các bước sau:
        </p>
        <ol>
          <li>
            Liên hệ với bộ phận chăm sóc khách hàng của Toidocsach qua email
            hoặc số điện thoại, cung cấp thông tin về đơn hàng và lý do yêu cầu
            đổi trả.
          </li>
          <li>
            Chúng tôi sẽ xác nhận yêu cầu và hướng dẫn quý khách gửi sản phẩm về
            lại kho của chúng tôi.
          </li>
          <li>
            Sau khi nhận và kiểm tra sản phẩm, chúng tôi sẽ tiến hành đổi mới
            hoặc hoàn tiền tùy theo yêu cầu của quý khách trong vòng 3-5 ngày
            làm việc.
          </li>
          <li>
            Phí vận chuyển cho quá trình đổi trả sẽ được chúng tôi hỗ trợ nếu
            lỗi thuộc về nhà sản xuất hoặc đơn vị vận chuyển.
          </li>
        </ol>
        <p>
          Chúng tôi luôn cố gắng đảm bảo quá trình đổi trả diễn ra nhanh chóng
          và thuận tiện nhất cho khách hàng.
        </p>
      </section>
    </div>
  );
};

export default page;
