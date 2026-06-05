import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/dashboard/Dashboard";
import CustomerDetail from "../views/customer_detail/CustomerDetail";
import NotFound from "../components/not_found/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/customer/:customerId" element={<CustomerDetail/>} />
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
