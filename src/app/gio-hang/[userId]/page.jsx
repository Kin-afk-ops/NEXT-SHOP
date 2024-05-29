import CartTop from "../../../components/cart/cartTop/CartTop";
import CartContainer from "../../../components/cart/cartContainer/CartContainer";

const CartPage = ({ params }) => {
  return (
    <div>
      <CartTop userId={params.userId} />
      <CartContainer userId={params.userId} />
    </div>
  );
};

export default CartPage;
