import ToastProvider from "@/toast/ToastProvider";
import CustomerNav from "../../components/customer/customerNav/CustomerNav";
const Layout = ({ children }) => {
  return (
    <div className="row">
      <CustomerNav />
      <div className="col c-9 ">
        <ToastProvider>{children}</ToastProvider>
      </div>
    </div>
  );
};

export default Layout;
