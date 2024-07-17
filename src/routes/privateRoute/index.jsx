import PrivateRoute from "../../features/protectedRouter/PrivateRoute";
import LayoutIndex from "../../layouts";

const privateRoutes = [
    {
      path: "/admin",
      element: <PrivateRoute element={<LayoutIndex />} />,
      children: [
       
      ],
    },
  ];
  
  export default privateRoutes;