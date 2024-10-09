const passwordValidator = (
  password,
  setPasswordError,
  setPasswordErrorMessage
) => {
  if (password.length === 0) {
    setPasswordError(true);
    setPasswordErrorMessage("Mật khẩu không được bỏ trống");
  } else if (password.length < 8) {
    setPasswordError(true);
    setPasswordErrorMessage("Mật khẩu phải trên 8 kí tự");
  } else {
    setPasswordError(false);
    setPasswordErrorMessage("");
  }
};

export default passwordValidator;
