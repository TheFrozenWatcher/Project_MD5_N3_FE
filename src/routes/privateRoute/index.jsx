import PrivateRoute from "../../features/protectedRouter/PrivateRoute";
import LayoutIndex from "../../layouts";
import AdminCategoryIndex from "../../pages/category";

const privateRoutes = [
    {
      path: "/admin",
      element: <PrivateRoute element={<LayoutIndex />} />,
      children: [
        {path:"category",
          element:<AdminCategoryIndex/>
        }
       
      ],
    },
  ];
  
  export default privateRoutes;