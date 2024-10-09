const phoneValidator = (phoneNumber, setPhoneError, setPhoneErrorMessage) => {
  if (phoneNumber.length === 0) {
    setPhoneError(true);
    setPhoneErrorMessage("Số điện thoại không được bỏ trống");
  } else if (
    phoneNumber.length < 10 ||
    phoneNumber.length > 10 ||
    phoneNumber.charAt(0) !== "0" ||
    !/^\d{10}$/.test(phoneNumber)
  ) {
    setPhoneError(true);
    setPhoneErrorMessage("Hãy nhập một số điện thoại hợp lệ!");
  } else {
    setPhoneError(false);
    setPhoneErrorMessage("");
  }
};

export default phoneValidator;
