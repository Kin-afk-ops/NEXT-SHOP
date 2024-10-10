import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Image from "next/image";
import "./header.css";
import "./responsive.css";
import logo from "../../assets/images/toi_doc_sach_logo.png";

import HeaderInput from "./HeaderInput";

import HeaderRight from "./HeaderRight";
import dynamic from "next/dynamic";

const Header = () => {
  // const [language, setLanguage] = useState("VI");

  // const [loading, setLoading] = useState(false);

  // const languages = ["VI", "ENG"];

  return (
    <div className="header">
      <div className="header__content grid wide">
        <div className="header__left s-12">
          <Link className="link header__logo--img" href="/">
            <Image src={logo} alt="logo" priority={true} />
          </Link>

          {/* <Link className="link header__icon--left" href="/bai-viet">
            <i className="fa-solid fa-newspaper"></i>
            <span>Bài viết</span>
          </Link> */}
        </div>

        <HeaderInput />

        <HeaderRight />
      </div>
    </div>
  );
};

// export default dynamic(() => Promise.resolve(Header), { ssr: false });
export default Header;
