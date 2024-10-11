"use client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, getCart, getNoti } from "../../lib/apiCall";
import { toast } from "react-toastify";
import phoneValidator from "@/validation/phone";
import passwordValidator, {
  passwordConfirmValidator,
} from "@/validation/password";
import axiosInstance from "@/config";
import { turnOff, turnOn } from "../../lib/features/formLogin/formLoginSlice";

const HeaderModal = ({ mode, setMode }) => {
  const router = useRouter();
  const [noAccount, setNoAccount] = useState(false);
  const [checkHeaderModal, setCheckHeaderModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [phoneLoginError, setPhoneLoginError] = useState(false);
  const [passwordLoginError, setPasswordLoginError] = useState(false);

  const [phoneRegisterError, setPhoneRegisterError] = useState(false);
  const [phoneRegisterErrorMessage, setPhoneRegisterErrorMessage] =
    useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const [passwordRegisterErrorMessage, setPasswordRegisterErrorMessage] =
    useState("");
  const [passwordRegisterError, setPasswordRegisterError] = useState(false);

  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const headerModalMode = useSelector((state) => state.formLogin.on);

  const dispatch = useDispatch();

  useEffect(() => {
    if (headerModalMode) {
      setCheckHeaderModal(true);
    } else {
      setCheckHeaderModal(false);
    }
  }, [headerModalMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    phoneValidator(phone, setPhoneError, setPhoneErrorMessage);
    passwordValidator(password, setPasswordError, setPasswordErrorMessage);
    const newLogin = {
      phone,
      password,
    };

    login(dispatch, newLogin, setNoAccount);
  };

  const handleForgetPassword = () => {
    dispatch(turnOff());
    router.push("/tai-khoan/quen-mat-khau");
  };

  const checkEmpty = (content) => {
    return content === "" ? true : false;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    phoneValidator(phone, setPhoneRegisterError, setPhoneRegisterErrorMessage);
    passwordValidator(
      password,
      setPasswordRegisterError,
      setPasswordRegisterErrorMessage
    );
    passwordValidator(
      confirmPassword,
      setConfirmPasswordError,
      setConfirmPasswordErrorMessage
    );

    passwordConfirmValidator(
      password,
      confirmPassword,
      setConfirmPasswordError,
      setConfirmPasswordErrorMessage
    );

    if (
      !phoneError &&
      !passwordError &&
      !confirmPasswordError &&
      !checkEmpty(phone) &&
      !checkEmpty(password) &&
      !checkEmpty(confirmPassword)
    ) {
      const newRegister = {
        phone,
        password,
      };

      const newInfoUser = {
        avatar: {
          path: "",
          publicId: "",
        },

        lastName: "",
        firstName: "",
        email: "",
        gender: "",
        birthday: "",
        address: {
          province: "",
          district: "",
          ward: "",
          address: "",
        },
      };

      try {
        const resRegister = await axiosInstance.post(
          "/auth/register",
          newRegister
        );

        const newNotification = {
          userId: resRegister.data._id,
        };

        try {
          const resNotification = await axiosInstance.post(
            "/auth/createNotification",
            newNotification
          );

          const resInfoUser = await axiosInstance.post(
            `/infoUser/${resRegister.data._id}`,
            newInfoUser
          );

          toast.success("Đăng ký thành công");
          setMode("login");
        } catch (error) {
          console.log(error.response);
        }
      } catch (error) {
        toast.error("Đăng kí thất bại!");

        console.log(error);
      }
    }
  };

  return (
    <div>
      {checkHeaderModal && (
        <div className="header__modal">
          <div
            className="header__modal--overlay"
            onClick={() => dispatch(turnOff())}
          ></div>
          {mode === "login" ? (
            <div
              className="main__container register__container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="register__title">
                <h1 className="main__title">Đăng nhập</h1>
                <i
                  onClick={() => dispatch(turnOff())}
                  className="header__modal--close fa-solid fa-rectangle-xmark l-0 m-0"
                ></i>
              </div>

              <hr />

              <div className="register__content">
                <form className="register__form" onSubmit={handleLogin}>
                  <label>Số điện thoại</label>
                  <input
                    placeholder="Nhập số điện thoại"
                    type="text"
                    value={phone}
                    onFocus={() => {
                      setPhoneError(false);
                      setPhoneErrorMessage("");
                    }}
                    onChange={(e) => {
                      setPhoneLoginError(false);
                      setPhone(e.target.value);
                      setNoAccount(false);
                    }}
                  />

                  {phoneError && (
                    <p className="error__message">{phoneErrorMessage}</p>
                  )}

                  <label>Mật khẩu</label>
                  <div className="password__block">
                    <input
                      placeholder="Nhập mật khẩu"
                      type={passwordType ? "password" : "text"}
                      value={password}
                      onFocus={() => {
                        setPasswordError(false);
                        setPasswordErrorMessage("");
                      }}
                      onChange={(e) => {
                        setPasswordLoginError(false);
                        setPassword(e.target.value);
                        setNoAccount(false);
                      }}
                    />

                    {password?.length !== 0 && (
                      <i
                        className={
                          passwordType
                            ? "fa-solid fa-eye-slash"
                            : "fa-solid fa-eye"
                        }
                        onClick={() => setPasswordType(!passwordType)}
                      ></i>
                    )}
                  </div>

                  {passwordError && (
                    <p className="error__message">{passwordErrorMessage}</p>
                  )}
                  <div
                    className="forget__password"
                    onClick={handleForgetPassword}
                  >
                    Quên mật khẩu
                  </div>

                  <button
                    className="main__btn register__btn--main"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="main__btn register__btn--extra"
                    onClick={() => setMode("register")}
                  >
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div
              className="main__container register__container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="register__title">
                {" "}
                <h1 className=" main__title">Đăng ký</h1>
                <i
                  onClick={() => dispatch(turnOff())}
                  className="header__modal--close fa-solid fa-rectangle-xmark l-0 m-0"
                ></i>
              </div>
              <hr />

              <div className="register__content">
                <form className="register__form" onSubmit={handleRegister}>
                  <label>Số điện thoại</label>
                  <input
                    placeholder="Nhập số điện thoại"
                    type="text"
                    id="email"
                    onFocus={() => {
                      setPhoneRegisterError(false);
                      setPhoneRegisterErrorMessage("");
                    }}
                    value={phone}
                    onChange={(e) => {
                      setPhoneRegisterError(false);
                      setPhoneRegisterErrorMessage("");
                      setPhone(e.target.value);
                    }}
                  />

                  {phoneRegisterError && (
                    <p className="error__message">
                      {phoneRegisterErrorMessage}
                    </p>
                  )}

                  <label>Mật khẩu</label>
                  <div className="password__block">
                    <input
                      placeholder="Nhập mật khẩu"
                      type={passwordType ? "password" : "text"}
                      value={password}
                      onFocus={() => {
                        setPasswordRegisterError(false);
                        setPasswordRegisterErrorMessage("");
                      }}
                      onChange={(e) => {
                        setPasswordRegisterError(false);
                        setPasswordRegisterErrorMessage("");
                        setPassword(e.target.value);
                      }}
                    />
                    <i
                      className={
                        passwordType
                          ? "fa-solid fa-eye-slash"
                          : "fa-solid fa-eye"
                      }
                      onClick={() => setPasswordType(!passwordType)}
                    ></i>
                  </div>

                  {passwordRegisterError && (
                    <p className="error__message">
                      {passwordRegisterErrorMessage}
                    </p>
                  )}

                  <label>Nhập lại mật khẩu</label>
                  <div className="password__block">
                    <input
                      placeholder="Nhập lại mật khẩu"
                      type={confirmPasswordType ? "password" : "text"}
                      onFocus={() => {
                        setConfirmPasswordError(false);
                        setConfirmPasswordErrorMessage("");
                      }}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPasswordError(false);
                        setConfirmPasswordErrorMessage("");
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <i
                      className={
                        confirmPasswordType
                          ? "fa-solid fa-eye-slash"
                          : "fa-solid fa-eye"
                      }
                      onClick={() =>
                        setConfirmPasswordType(!confirmPasswordType)
                      }
                    ></i>
                  </div>

                  {confirmPasswordError && (
                    <p className="error__message">
                      {confirmPasswordErrorMessage}
                    </p>
                  )}

                  <button
                    className="main__btn register__btn--main"
                    type="submit"
                  >
                    Đăng ký
                  </button>
                  <button
                    className="main__btn register__btn--extra"
                    onClick={() => setMode("login")}
                  >
                    Đăng nhập
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderModal;
