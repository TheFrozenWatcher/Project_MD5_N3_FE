import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Button } from "@mui/material";
import { GET } from "../../constants/httpMethod";
import BASE_URL from "../../api";

const Header = () => {
  const cookie = new Cookies();
  const isLogin = cookie.get("isLogin");
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const token = cookie.get("accessToken");
      try {
        const response = await BASE_URL[GET]("user/getCartCount", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartCount(response.data);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    if (isLogin) {
      fetchCartCount();
    }
  }, [isLogin]);

  const handleLogOut = () => {
    cookie.remove("type");
    cookie.remove("user");
    cookie.remove("accessToken");
    cookie.set("isLogin", false);
    navigate("/login");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <header id="header" className="bg-white pl-4 pr-4">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div>
            <img
              className="w-32"
              src="https://static.vecteezy.com/system/resources/previews/010/074/323/non_2x/electricity-logo-electric-logo-design-template-vector.jpg"
              alt="Logo"
            />
          </div>

          <div className="nav__menu hidden md:flex text-gray-800">
            <ul className="nav__list flex space-x-6">
              <li className="nav__item">
                <Link to={`/home`}>
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link to={`/user/product`}> Products</Link>
              </li>
              <li className="nav__item">
                <Link to={`/user/blog`}>Blog</Link>
              </li>
              <li className="nav__item">
                <a href="#" className="hover:text-black hover:font-semibold">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="nav__icons flex align-middle space-x-4">
            <div className="flex border-opacity-100 border-2 p-1">
              <input
                type="text"
                className="border-none pl-3 focus:outline-none"
              />
              <FaSearch className="text-gray-500" />
            </div>
            <div className="flex relative">
              <Link to={`/user/cart`} className="relative">
                <FaShoppingCart className="text-gray-500 size-6" />
                {cartCount > 0 && (
                  <span
                    id="cart__total"
                    className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center text-white"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
            {isLogin ? (
              <Button onClick={handleLogOut} variant="contained">
                Log Out
              </Button>
            ) : (
              <Button onClick={handleLogIn} variant="contained">
                Log In
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
