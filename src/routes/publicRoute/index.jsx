


import ContactForm from "../../pages/contact/ContactForm";
import UserIndex from "../../pages/home/Home";
import Login from "../../pages/login";
import CreateAccount from "../../pages/signin";

const publicRoutes = [
  {
    path: "/signup",

    element: <CreateAccount/>,
 },
 {
  path: "/",

    element: <UserIndex/>,
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
