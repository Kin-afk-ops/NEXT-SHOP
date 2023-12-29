import Image from "next/image";
import Link from "next/link";

const LeftPostItem = () => {
  return (
    <Link className="link row" href="/bai-viet/abc">
      <div className="col c-8 left__post--item-title">
        <p>
          Người đẹp Wushu Dương Thúy Vi tiết lộ kỷ niệm 3 lần giành huy chương
          Asiad
        </p>
      </div>

      <div className="col c-4">
        <Image
          src="https://cdnphoto.dantri.com.vn/Ft5NQIGnN1tjffj-X5CJcxZNMHk=/zoom/480_320/2023/12/21/thumb-1703154791675.jpg"
          width={90}
          height={60}
          alt="image"
        />
      </div>
    </Link>
  );
};

export default LeftPostItem;
