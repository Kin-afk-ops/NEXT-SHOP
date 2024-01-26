import CartTop from "../../../components/cart/cartTop/CartTop";
import CartContainer from "../../../components/cart/cartContainer/CartContainer";
import axiosInstance from "@/config";

const CartPage = ({ params }) => {
  return (
    <div>
      <CartTop params={params} />
      <CartContainer userId={params.userId} />
    </div>
  );
};

export default CartPage;
