import PrivateRoute from "../../features/protectedRouter/PrivateRoute";
import LayoutIndex from "../../layouts";
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
import Orders from "../../pages/admin/Orders";

const privateRoutes = [
  {
    path: "/admin",
    element: <PrivateRoute element={<AdminIndex />} />,
    children: [
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
        element: <AdminProductIndex />,
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
        element: <Orders />,
      },
    ],
  },
  {
    path: "/home",
    element: <LayoutIndex />,
  },
  {
    path: "/user",
    element: <PrivateRoute element={<UserIndex />} />,
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
        path: "payment",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/userdetail",
    element: <PrivateRoute element={<UserDetail />} />,
  },
  {
    path: "/wishlist",
    element: <PrivateRoute element={<Wishlist />} />,
  },
];

export default privateRoutes;
