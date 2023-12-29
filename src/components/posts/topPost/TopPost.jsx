import Image from "next/image";
import "./topPost.css";
import Link from "next/link";

const TopPost = () => {
  return (
    <div className="row top__post">
      <div className="col c-8">
        <Link href="/bai-viet/abc" className="link">
          <div className="top__post--center">
            <Image
              src="https://cdnphoto.dantri.com.vn/CMsWXUux_m0baD63UfF3jvdwnxg=/zoom/774_516/2023/12/29/79384009-0-image-a-61703717086712-crop-1703833883504.jpeg"
              width={510}
              height={340}
              alt="image"
            />

            <p className="top__post--title">
              Cầu thủ bị đuổi khỏi đội tuyển quốc gia vì lý do hy hữu
            </p>

            <p className="top__post--desc">
              Cầu thủ Morlaye Sylla đã bị gạch tên khỏi danh sách đội tuyển
              Guina tham dự CAN 2024 (giải vô địch châu Phi) vì lý do tố HLV ăn
              trộm áo của mình.
            </p>
          </div>
        </Link>
      </div>
      <div className="col c-4">
        <Link href="/bai-viet/abc" className="link">
          <div className="top__post--left">
            <Image
              src="https://cdnphoto.dantri.com.vn/CMsWXUux_m0baD63UfF3jvdwnxg=/zoom/774_516/2023/12/29/79384009-0-image-a-61703717086712-crop-1703833883504.jpeg"
              width={252}
              height={168}
              alt="image"
            />

            <p className="top__post--left-title">
              Cầu thủ bị đuổi khỏi đội tuyển quốc gia vì lý do hy hữu
            </p>
          </div>
        </Link>

        <Link href="/bai-viet/abc" className="link">
          <div className="top__post--left">
            <Image
              src="https://cdnphoto.dantri.com.vn/CMsWXUux_m0baD63UfF3jvdwnxg=/zoom/774_516/2023/12/29/79384009-0-image-a-61703717086712-crop-1703833883504.jpeg"
              width={252}
              height={168}
              alt="image"
            />

            <p className="top__post--left-title">
              Cầu thủ bị đuổi khỏi đội tuyển quốc gia vì lý do hy hữu
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopPost;
