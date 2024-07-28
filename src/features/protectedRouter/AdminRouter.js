import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function AdminRoute({ element }) {
  const navigate = useNavigate();
  const cookie = new Cookies()
  const isLogin = cookie.get('isLogin');
  const user = cookie.get('user');

  useEffect(() => {
    if (isLogin) {
        if (user.authorities.some(authority => authority.authority==="ADMIN")) {
        } else {
            navigate("/");
        }
    } else{
        navigate("/login");
    }
  }, [isLogin]);
  return element;
}