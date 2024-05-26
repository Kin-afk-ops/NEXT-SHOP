import ToastProvider from "@/toast/ToastProvider";
import CustomerNav from "../../components/customer/customerNav/CustomerNav";
const Layout = ({ children }) => {
  return (
    <div className="row">
      <div className=" col l-3 m-3 s-0">
        <CustomerNav />
      </div>
      <div className="col l-9 m-9 s-12">
        <ToastProvider>{children}</ToastProvider>
      </div>

      <div className="l-0 m-0 s-12">
        <CustomerNav />
      </div>
    </div>
  );
};

export default Layout;
