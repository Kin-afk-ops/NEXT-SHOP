import Image from "next/image";
import "./topPost.css";
import Link from "next/link";

const TopPost = ({ topPost }) => {
  return (
    <div className="row top__post">
      <div className="col c-8">
        <Link href={`/bai-viet/${topPost[0].slug}`} className="link">
          <div className="top__post--center">
            <Image
              src={topPost[0].image.path}
              width={510}
              height={340}
              alt="image"
            />

            <p className="top__post--title">{topPost[0].title}</p>

            <p className="top__post--desc">{topPost[0].desc}</p>
          </div>
        </Link>
      </div>
      <div className="col c-4">
        <Link href={`/bai-viet/${topPost[1].slug}`} className="link">
          <div className="top__post--left">
            <Image
              src={topPost[1].image.path}
              width={252}
              height={168}
              alt="image"
            />

            <p className="top__post--left-title">{topPost[1].title}</p>
          </div>
        </Link>

        {/* <Link href={`/bai-viet/${topPost[2].slug}`} className="link">
          <div className="top__post--left">
            <Image
              src={topPost[2].image.path}
              width={252}
              height={168}
              alt="image"
            />

            <p className="top__post--left-title">{topPost[2].title}</p>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default TopPost;
