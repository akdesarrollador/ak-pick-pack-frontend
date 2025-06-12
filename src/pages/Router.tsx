import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import RoutesEnum from "../data/enums/routes";
import Login from "./Login";
import SearchOrder from "./SearchOrder";
import PendingOrders from "./PendingOrders";
import PendingProducts from "./PendingProducts";
import ProductItem from "./ProductItem";
import OrderPending from "./OrderPending";
import TotalItems from "./TotalItems";
import useAuthStore from "../stores/useAuthStore";

// Componente para proteger rutas privadas
const PrivateRoute = () => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Outlet /> : <Navigate to={RoutesEnum.Login} replace />;
};

const Router = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={RoutesEnum.SearchOrders} replace />
            ) : (
              <Navigate to={RoutesEnum.Login} replace />
            )
          }
        />
        {/* Login siempre accesible */}
        <Route path={RoutesEnum.Login} element={<Login />} />
        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path={RoutesEnum.SearchOrders} element={<SearchOrder />} />
          <Route path={RoutesEnum.PendingOrders} element={<PendingOrders />} />
          <Route
            path={RoutesEnum.PendingProducts}
            element={<PendingProducts />}
          />
          <Route path={RoutesEnum.Producto} element={<ProductItem />} />
          <Route path={RoutesEnum.OrderPending} element={<OrderPending />} />
          <Route path={RoutesEnum.FinalOrder} element={<TotalItems />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
