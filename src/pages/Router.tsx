import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoutesEnum from "../data/enums/routes";
import Login from "./Login";
import SearchOrder from "./SearchOrder";
import PendingOrders from "./PendingOrders";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesEnum.Login} element={<Login />} />
        <Route path={RoutesEnum.SearchOrders} element={<SearchOrder />} />
        <Route path={RoutesEnum.PendingOrders} element={<PendingOrders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;