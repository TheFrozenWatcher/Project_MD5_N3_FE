import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const navigate = useNavigate();
  const cookie = new Cookies()
  // const isLogin = cookie.get('isLogin');
  const isLogin = true; 

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);
  return element;
}