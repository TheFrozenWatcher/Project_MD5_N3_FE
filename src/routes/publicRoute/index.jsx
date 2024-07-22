import UserIndex from "../../pages/home/Home";
import CategoryWithProducts from "../../pages/home/ProductsByCategory";

import ContactForm from "../../pages/contact/ContactForm";
import Login from "../../pages/login";
import CreateAccount from "../../pages/signin";

const publicRoutes = [
 {
    path: "/signup",

    element: <CreateAccount/>,
 },
 {
   path: "/login",
   element: <Login/>,
    },
    {
      path: "/contact",
      element: <ContactForm/>,
    }
];

export default publicRoutes;