import Image from "next/image";
import "./page.css";
import logo from "../../assets/images/toi_doc_sach_logo.png";

const page = () => {
  return (
    <main class="main__container footer__content">
      <section id="gioi-thieu">
        <h2 className="main__title">Giới thiệu về Toidocsach</h2>
        <p>
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            Toidocsach
          </span>{" "}
          là một nền tảng trực tuyến chuyên cung cấp các đầu sách phong phú, với
          mục tiêu đưa sách đến gần hơn với tất cả mọi người. Tại
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            Toidocsach
          </span>
          , bạn sẽ tìm thấy những cuốn sách từ nhiều thể loại khác nhau, từ văn
          học cổ điển đến sách phát triển bản thân, khoa học, lịch sử và nhiều
          hơn thế nữa. Chúng tôi không chỉ đơn thuần là bán sách, mà còn muốn
          chia sẻ niềm đam mê và tình yêu với sách tới cộng đồng độc giả khắp
          Việt Nam.
        </p>
      </section>

      <section id="ngay-thanh-lap">
        <h2 className="main__title">Ngày thành lập</h2>
        <p>
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            Toidocsach
          </span>{" "}
          được thành lập vào ngày <strong>22 tháng 12 năm 2023</strong> tại
          thành phố Cần Thơ, một trong những trung tâm phát triển văn hóa của
          miền Tây Nam Bộ. Với xuất phát điểm khiêm tốn, chúng tôi đã và đang
          không ngừng nỗ lực mở rộng, mang lại những trải nghiệm tốt nhất cho
          khách hàng trên cả nước. Từ khi ra mắt,{" "}
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            Toidocsach
          </span>{" "}
          đã nhận được sự ủng hộ mạnh mẽ từ cộng đồng yêu sách, giúp chúng tôi
          có thêm động lực để tiếp tục phát triển.
        </p>
      </section>

      <section id="su-menh">
        <h2 className="main__title">Sứ mệnh của chúng tôi</h2>
        <p>
          Sứ mệnh của{" "}
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            Toidocsach
          </span>{" "}
          là cung cấp cho mọi người cơ hội tiếp cận với sách một cách thuận tiện
          nhất. Chúng tôi không chỉ là một nhà cung cấp sách, mà còn là một phần
          trong hành trình tri thức của độc giả, giúp họ mở rộng tầm nhìn và
          khám phá những tri thức mới. Chúng tôi cam kết mang lại những sản phẩm
          chất lượng, dịch vụ tận tâm và xây dựng cộng đồng yêu sách vững mạnh.
        </p>
      </section>

      <section id="tam-nhin">
        <h2 className="main__title">Tầm nhìn</h2>
        <p>
          Trong tương lai,{" "}
          <span
            style={{
              color: "var(--primary-color)",
            }}
          >
            Toidocsach
          </span>{" "}
          đặt mục tiêu trở thành hệ thống bán sách trực tuyến hàng đầu tại Việt
          Nam. Chúng tôi mong muốn không chỉ đáp ứng nhu cầu đọc sách của độc
          giả trong nước, mà còn mở rộng ra các thị trường quốc tế. Chúng tôi
          không ngừng cải tiến dịch vụ, đa dạng hóa các đầu sách và mang đến
          những trải nghiệm mua sắm trực tuyến thuận tiện, thân thiện nhất cho
          khách hàng.
        </p>
      </section>
    </main>
  );
};

export default page;
