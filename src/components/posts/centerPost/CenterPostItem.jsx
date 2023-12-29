import Image from "next/image";
import Link from "next/link";

const CenterPostItem = () => {
  return (
    <Link href="/bai-viet/abc" className="link row center__post--item">
      <div className="col c-4">
        <Image
          src="https://cdnphoto.dantri.com.vn/CMsWXUux_m0baD63UfF3jvdwnxg=/zoom/774_516/2023/12/29/79384009-0-image-a-61703717086712-crop-1703833883504.jpeg"
          width={252}
          height={168}
          alt="image"
        />
      </div>

      <div className="col c-8">
        <p className="center__post--title">
          Cầu thủ bị đuổi khỏi đội tuyển quốc gia vì lý do hy hữu
        </p>

        <p className="center__post--desc">
          Cầu thủ Morlaye Sylla đã bị gạch tên khỏi danh sách đội tuyển Guina
          tham dự CAN 2024 (giải vô địch châu Phi) vì lý do tố HLV ăn trộm áo
          của mình.
        </p>
      </div>
    </Link>
  );
};

export default CenterPostItem;
