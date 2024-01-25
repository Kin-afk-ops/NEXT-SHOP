import axiosInstance from "@/config";
import "./page.css";
import PayContent from "@/components/payContent/PayContent";

const PayPage = async ({ params }) => {
  // let infoUser = {};

  // try {
  //   const res = await axiosInstance.get(`/infoUser/${userId}`);

  //   infoUser = res.data;
  // } catch (error) {
  //   console.log(error);
  // }

  // console.log(resInfoUser.data);

  // const infoUser = resInfoUser.data;

  return (
    <div className="pay main__container">
      <h1 className="main__title pay__title">ĐỊA CHỈ GIAO HÀNG</h1>
      <hr />

      <PayContent />
    </div>
  );
};

export default PayPage;
