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
import PaymentPage from "../../pages/payment";

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
        path: "coupon",
        element: <PrivateRoute element={<Coupon />} />,
      },
      {
        path: "event",
        element: <PrivateRoute element={<Event />} />,
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
        path: "product",
        element: <UserProductIndex />,
        children: [
          {
            path: "",
            element: <UserProductList />,
          },
          {
            path: ":id", // Ensure the parameter name matches useParams()
            element: <UserProductDetail />, // Add UserProductDetail route
          },
        ],
      },
      {
        path: "payment",
        element: <PrivateRoute element={<PaymentPage/>}/>,
      }
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
