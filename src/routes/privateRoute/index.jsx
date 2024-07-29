import PrivateRoute from "../../features/protectedRouter/PrivateRoute";
import AdminCategoryIndex from "../../pages/category";
import AdminIndex from "../../pages/admin";
import User from "../../pages/admin/User";
import AdminProductIndex from "../../pages/product";
import UserIndex from "../../pages/home/Home";
import UserProductIndex from "../../pages/product/UserIndex";
import UserProductList from "../../components/product/ProductList";
import UserProductDetail from "../../pages/product/Detail";
import UserDetail from "../../pages/userdetail";
import Banner from "../../pages/admin/banner/Banner";
import Wishlist from "../../pages/wishlist";
import Coupon from "../../pages/admin/coupon/Coupon";
import Event from "../../pages/admin/event/Event";
import CartList from "../../components/cart/CartList";
import PaymentPage from "../../pages/payment";
import AdminOrderList from "../../pages/orders/Orders";
import OrderDetailPage from "../../pages/orders/AdminOrderDetail";
import PurchaseHistory from "../../pages/payhistory";
import Dashboard from "../../pages/admin/dashboard";

import AdminRoute from "../../features/protectedRouter/AdminRouter";
import NotFound from "../../pages/errors/404";

import LayoutIndex from "../../layouts";
import AdminProductDetailIndex from "../../pages/productDetail";


const privateRoutes = [
  {
    path: "/admin",
    element: <AdminRoute element={<AdminIndex />} />,
    children: [
      {
        index: true,
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "category",
        element: <AdminCategoryIndex />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "product",
        children: [{ path: "", element: <AdminProductIndex /> },
          { path: "user/product/:id", element: <UserProductDetail /> },
        ],
      },
      {
        path: "productDetail",
        element: <AdminProductDetailIndex />,
      },
      {
        path: "banner",
        element: <Banner />,
      },
      {
        path: "coupon",
        element: <Coupon />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "order",
        exact: true,
        children: [
          {
            path: "",
            element: <AdminOrderList />,
          },
          {
            path: ":id",
            element: <OrderDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/home",
    element: <UserIndex />,
  },
  {
    path: "/user",
    element: <LayoutIndex />,
    exact: true,
    children: [
      {
        path: "product",
        element: <UserProductIndex />,
        children: [
          {
            path: "",
            element: <UserProductList />,
          },
          {
            path: ":id",
            element: <UserProductDetail />,
          },
        ],
      },
      {
        path: "cart",
        element: <CartList />,
      },
      {
        path: "",
        element: <UserIndex />,
      },
      {
        path: "payment",
        element: <PrivateRoute element={<PaymentPage />} />,
      },
      {
        path: "payhistory",
        element: <PrivateRoute element={<PurchaseHistory />} />,
      },
      {
        path: "userdetail",
        element: <PrivateRoute element={<UserDetail />} />,
      },
    ],
  },

  {
    path: "/wishlist",
    element: <PrivateRoute element={<Wishlist />} />,
  },
  {
    path: "*",
    element: <NotFound/>
  }
];

export default privateRoutes;
