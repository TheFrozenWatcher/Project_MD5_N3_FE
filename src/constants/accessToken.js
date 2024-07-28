import { Cookies } from "react-cookie";

const getToken = () => {
  const cookie = new Cookies();
  return cookie.get('accessToken');
}

export const accessToken=getToken();