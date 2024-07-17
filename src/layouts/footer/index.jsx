import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are a company dedicated to providing the best products and
              services to our customers.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="/" className="hover:text-gray-200">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="hover:text-gray-200">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="hover:text-gray-200">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-gray-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400">123 Main Street, Anytown, USA</p>
            <p className="text-gray-400">Email: info@example.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
