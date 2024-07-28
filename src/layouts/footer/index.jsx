import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <div className="footer__top grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="footer-top__box">
            <h3 className="text-lg font-semibold mb-4">EXTRAS</h3>
            <Link to={"/"} className="block hover:text-gray-300">Brands</Link>
            <Link to={"/"} className="block hover:text-gray-300">Gift Certificates</Link>
            <Link to={"/"} className="block hover:text-gray-300">Affiliate</Link>
            <Link to={"/"} className="block hover:text-gray-300">Specials</Link>
            <Link to={"/"} className="block hover:text-gray-300">Site Map</Link>
          </div>
          <div className="footer-top__box">
            <h3 className="text-lg font-semibold mb-4">INFORMATION</h3>
            <Link to={"/"} className="block hover:text-gray-300">About Us</Link>
            <Link to={"/"} className="block hover:text-gray-300">Privacy Policy</Link>
            <Link to={"/"} className="block hover:text-gray-300">Terms & Conditions</Link>
            <Link to={"/contact"} className="block hover:text-gray-300">Contact Us</Link>
            <Link to={"/"} className="block hover:text-gray-300">Site Map</Link>
          </div>
          <div className="footer-top__box">
            <h3 className="text-lg font-semibold mb-4">MY ACCOUNT</h3>
            <Link to={"/user/userdetail"} className="block hover:text-gray-300">My Account</Link>
            <Link to={"/user/payhistory"} className="block hover:text-gray-300">Order History</Link>
            <Link to={"/wishlist"} className="block hover:text-gray-300">Wish List</Link>
            <Link to={"/"} className="block hover:text-gray-300">Newsletter</Link>
            <Link to={"/"} className="block hover:text-gray-300">Returns</Link>
          </div>
          <div className="footer-top__box">
            <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
            <div className="flex items-center mb-2">
              <span className="mr-2">
                <svg className="w-5 h-5">
                  <use xlinkHref="./images/sprite.svg#icon-location"></use>
                </svg>
              </span>
              Ha Noi, Viet Nam
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">
                <svg className="w-5 h-5">
                  <use xlinkHref="./images/sprite.svg#icon-envelop"></use>
                </svg>
              </span>
              liem@gmail.com
            </div>
            <div className="flex items-center mb-2">
              <span className="mr-2">
                <svg className="w-5 h-5">
                  <use xlinkHref="./images/sprite.svg#icon-phone"></use>
                </svg>
              </span>
              0943xxxxxx
            </div>
            <div className="flex items-center">
              <span className="mr-2">
                <svg className="w-5 h-5">
                  <use xlinkHref="./images/sprite.svg#icon-paperplane"></use>
                </svg>
              </span>
              Ha Noi, Viet Nam
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom mt-8">
        <div className="footer-bottom__box text-center py-4">
        </div>
        <div className="footer-bottom__box text-center py-4">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
