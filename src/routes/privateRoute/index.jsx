import PrivateRoute from "../../features/protectedRouter/PrivateRoute";
import LayoutIndex from "../../layouts";
import AdminIndex from "../../pages/admin";

const privateRoutes = [
    {
      path: "/admin",
      element: <PrivateRoute element={<AdminIndex />} />,
      children: [
       
      ],
    },
  ];
  
  export default privateRoutes;