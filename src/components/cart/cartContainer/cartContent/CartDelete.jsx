"use client";
import axiosInstance from "@/config";
import { useRouter } from "next/navigation";

const CartDelete = ({ deleteDisplay, setDeleteDisplay, deleteId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/cart/${deleteId}`);
      setDeleteDisplay(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={deleteDisplay ? "customer__modal" : "hidden"}>
      <div className="customer__modal--title">
        Bạn muốn xoá sản phẩm này trong giỏ hàng
      </div>

      <div className="customer__modal--content">
        <button
          className="customer__modal--hide"
          onClick={() => setDeleteDisplay(false)}
        >
          Huỷ
        </button>
        <button className="customer__modal--agree" onClick={handleDelete}>
          Đồng ý
        </button>
      </div>
    </div>
  );
};

export default CartDelete;
