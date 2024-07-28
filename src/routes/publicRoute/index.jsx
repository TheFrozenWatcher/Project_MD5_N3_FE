import ContactForm from "../../pages/contact/ContactForm";
import Unauthorized from "../../pages/errors/403";
import NotFound from "../../pages/errors/404";
import UserIndex from "../../pages/home/Home";
import Login from "../../pages/login";
import CreateAccount from "../../pages/signin";

const publicRoutes = [
  {
    path: "/signup",

    element: <CreateAccount />,
  },
  {
    path: "/",

    element: <UserIndex />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/contact",
    element: <ContactForm />,
  },
  {
    path: "/403",
    element: <Unauthorized/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
];

export default publicRoutes;
