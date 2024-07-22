import UserIndex from "../../pages/home/Home";
import CategoryWithProducts from "../../pages/home/ProductsByCategory";
import CreateAccount from "../../pages/signin";

const publicRoutes = [
 {
    path: "/signup",
    element: <CreateAccount/>
 },
 
];

export default publicRoutes;