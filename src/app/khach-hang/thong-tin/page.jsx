import Image from "next/image";
import "./page.css";
import avatar from "../../../assets/images/default_avatar.png";

const CustomerContentInfo = () => {
  return (
    <div>
      <div className="customer__info main__container">
        <Image
          src={avatar}
          alt="avatar"
          width={225}
          height={225}
          style={{
            objectFit: "contain",
          }}
          className="customer__info--avatar"
        />

        <div className="customer__info--info">
          <p>
            <i className="fa-solid fa-circle-info"></i>
            {/* {{ userName }} */} ten
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>
            {/* {{ user.email }} */} email
          </p>
          <p>
            <i className="fa-solid fa-phone"></i>
            {/* {{ userInfo.phone }} */} phone
          </p>
          <p>
            <i className="fa-solid fa-person"></i>
            {/* {{ userInfo.sex }} */} gioi
          </p>
          <p>
            <i className="fa-solid fa-cake-candles"></i>
            {/* {{ birthday }} */}birthday
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i>
            {/* {{ userInfo.address }} */} address
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentInfo;
