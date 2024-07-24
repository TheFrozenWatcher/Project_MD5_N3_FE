import PrivateRoute from "../../features/protectedRouter/PrivateRoute";
import LayoutIndex from "../../layouts";
import AdminCategoryIndex from "../../pages/category";
import AdminIndex from "../../pages/admin";
import User from "../../pages/admin/User";
import AdminProductIndex from "../../pages/product";
import UserIndex from "../../pages/home/Home";
import UserDetail from "../../pages/userdetail";
import UserProductIndex from "../../pages/product/UserIndex";
import UserProductList from "../../components/product/ProductList";
import UserProductDetail from "../../pages/product/Detail";

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
    ],
  },
  { path: "/userdetail", element: <PrivateRoute element={<UserDetail />} /> },
];
export default privateRoutes;
