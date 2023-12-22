import Image from "next/image";
import avatar from "../../../assets/images/default_avatar.png";
import "./page.css";

const CustomerContentEdit = () => {
  return (
    <div className="customer__edit  main__container">
      <form>
        <div className="customer__edit--left">
          <Image
            src={avatar}
            alt="avatar"
            width={225}
            height={225}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="customer__edit--right">
          <label for="">Họ</label>
          <input className="customer__edit--input" type="text" />
          {/* <p className="error__message">
          {{ errorMessage.lastName }}
        </p> */}
          <label for="">Tên</label>
          <input className="customer__edit--input" type="text" />
          {/* <p className="error__message" v-if="!isSubmit">
          {{ errorMessage.firstName }}
        </p> */}

          <label for="">Số điện thoại</label>
          <input className="customer__edit--input" type="text" />
          {/* <p className="error__message" v-if="!isSubmit">{{ errorMessage.phone }}</p> */}

          <label for="">Giới tính</label>
          <div className="customer__edit--right-gender">
            <input type="radio" name="gender" value="Nam" />

            <label for="">Nam</label>
            <input type="radio" name="gender" value="Nữ" />
            <label for="">Nữ</label>
          </div>

          <label for="">Ngày sinh</label>
          <input className="customer__edit--input" type="date" />
          {/* <p className="error__message" v-if="!isSubmit">
          {{ errorMessage.birthday }}
        </p> */}

          <label for="">Địa chỉ</label>
          <input className="customer__edit--input" type="text" />
          {/* <p className="error__message" v-if="!isSubmit">
          {{ errorMessage.address }}
        </p> */}

          <button className="customer__edit--button" type="submit">
            Lưu thay đổi
          </button>
        </div>
      </form>

      <div className="customer__modal hidden">
        <div className="customer__modal--title">
          Bạn có muốn thay đổi hồ sơ?
        </div>
        <div className="customer__modal--content">
          <button className="customer__modal--hide">Huỷ</button>
          <button className="customer__modal--agree">Thay đổi</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerContentEdit;
