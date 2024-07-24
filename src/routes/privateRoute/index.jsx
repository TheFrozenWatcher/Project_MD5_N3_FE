import PrivateRoute from "../../features/protectedRouter/PrivateRoute";
import LayoutIndex from "../../layouts";
import AdminCategoryIndex from "../../pages/category";
import AdminIndex from "../../pages/admin";
import User from "../../pages/admin/User";
import AdminProductIndex from "../../pages/product";
import UserIndex from "../../pages/home/Home";
import CategoryWithProducts from "../../pages/home/ProductsByCategory";
import UserDetail from "../../pages/userdetail";
import Banner from "../../pages/admin/banner/Banner";
import Wishlist from "../../pages/wishlist";
import Orders from "../../pages/admin/Orders";
import Voucher from "../../pages/admin/coupon/Coupon";
import Coupon from "../../pages/admin/coupon/Coupon";

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
        element: <PrivateRoute element={<User />} />,
      },
      {
        path: "product",
        element: <PrivateRoute element={<AdminProductIndex />} />,
      },
      {
        path: "banner",
        element: <PrivateRoute element={<Banner />} />,
      },
      {
        path: "orders",
        element: <PrivateRoute element={<Orders />} />,
      },
      {
        path: "coupon",
        element: <PrivateRoute element={<Coupon />} />,
      },
    ],
  },
  {
    path: "/home",
    element: <PrivateRoute element={<LayoutIndex />} />,
  },
  {
    path: "/user",
    element: <PrivateRoute element={<UserIndex />} />,
    children: [
      {
        path: "category/:id",
        element: <CategoryWithProducts />,
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
