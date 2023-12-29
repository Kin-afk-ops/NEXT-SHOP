import Link from "next/link";
import Image from "next/image";
import "./leftPost.css";
import LeftPostItem from "./LeftPostItem";

const LeftPost = () => {
  return (
    <div className="left__post">
      <p className="left__post--title">NỔI BẬT</p>

      <Link href="bai-viet/abc" className="link left__post--top">
        <Image
          src="https://cdnphoto.dantri.com.vn/Ft5NQIGnN1tjffj-X5CJcxZNMHk=/zoom/480_320/2023/12/21/thumb-1703154791675.jpg"
          width={300}
          height={200}
        />

        <p>
          Aston Villa, Girona và Leverkusen: Hiện tượng thú vị thời hậu
          Messi-Ronaldo
        </p>
      </Link>

      <div className="left__post--item">
        <LeftPostItem />
      </div>

      <div className="left__post--item">
        <LeftPostItem />
      </div>

      <div className="left__post--item">
        <LeftPostItem />
      </div>

      <div className="left__post--item">
        <LeftPostItem />
      </div>

      <div className="left__post--item">
        <LeftPostItem />
      </div>
    </div>
  );
};

export default LeftPost;
