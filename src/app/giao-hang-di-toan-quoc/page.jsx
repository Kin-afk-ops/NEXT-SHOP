import "./page.css";

const page = () => {
  return (
    <div className="main__container footer__content">
      <section id="chinh-sach-giao-hang">
        <h2 className="main__title">Chính sách giao hàng</h2>
        <p>
          Tại <strong>Toidocsach</strong>, chúng tôi cam kết cung cấp dịch vụ
          giao hàng toàn quốc để phục vụ quý khách hàng ở bất kỳ đâu. Với mạng
          lưới vận chuyển rộng khắp cả nước, chúng tôi đảm bảo rằng mọi đơn hàng
          sẽ được giao tới tận tay khách hàng trong thời gian ngắn nhất và với
          chi phí hợp lý nhất.
        </p>
        <p>
          Chúng tôi hợp tác với các đối tác giao hàng uy tín như Giao Hàng
          Nhanh, Viettel Post và nhiều đơn vị khác để mang đến trải nghiệm mua
          sắm trực tuyến thuận tiện và an toàn.
        </p>
      </section>

      <section id="phi-van-chuyen">
        <h2 className="main__title">Phí vận chuyển</h2>
        <p>
          Phí vận chuyển tại Toidocsach được tính toán dựa trên khu vực và khối
          lượng đơn hàng của bạn. Cụ thể như sau:
        </p>
        <ul>
          <li>
            <strong>Khu vực nội thành:</strong> Miễn phí vận chuyển cho đơn hàng
            trên 300,000 VNĐ. Đơn hàng dưới 300,000 VNĐ sẽ tính phí vận chuyển
            là 30,000 VNĐ.
          </li>
          <li>
            <strong>Khu vực ngoại thành và tỉnh thành khác:</strong> Phí vận
            chuyển từ 40,000 VNĐ - 60,000 VNĐ tùy thuộc vào khoảng cách và khối
            lượng đơn hàng.
          </li>
          <li>
            <strong>Miễn phí vận chuyển:</strong> Toidocsach áp dụng miễn phí
            vận chuyển cho các đơn hàng trên 500,000 VNĐ trên toàn quốc.
          </li>
        </ul>
      </section>

      <section id="thoi-gian-giao-hang">
        <h2 className="main__title">Thời gian giao hàng</h2>
        <p>
          Thời gian giao hàng của chúng tôi được chia theo khu vực địa lý để đảm
          bảo độ chính xác:
        </p>
        <ul>
          <li>
            <strong>Khu vực nội thành:</strong> Thời gian giao hàng từ 1 - 2
            ngày làm việc.
          </li>
          <li>
            <strong>Khu vực ngoại thành:</strong> Thời gian giao hàng từ 2 - 4
            ngày làm việc.
          </li>
          <li>
            <strong>Khu vực tỉnh thành khác:</strong> Thời gian giao hàng từ 3 -
            7 ngày làm việc.
          </li>
        </ul>
        <p>
          Chúng tôi cam kết giao hàng đúng thời gian quy định. Trong trường hợp
          gặp sự cố vận chuyển hoặc các yếu tố ngoài tầm kiểm soát, chúng tôi sẽ
          thông báo và hỗ trợ quý khách kịp thời.
        </p>
      </section>
    </div>
  );
};

export default page;
