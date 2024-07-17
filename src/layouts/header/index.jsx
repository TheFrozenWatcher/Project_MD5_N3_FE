import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold">
          <img
            href="/"
            className="hover:text-gray-200"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDBcUZ1uzDYaAM9YFxQX7_gRSCuG4pQa0wA&s"
            alt="Website"
          ></img>
        </div>
        <nav className="flex space-x-4">
          <a href="/" className="hover:text-gray-200">
            Home
          </a>
          <a href="/about" className="hover:text-gray-200">
            About
          </a>
          <a href="/services" className="hover:text-gray-200">
            Services
          </a>
          <a href="/contact" className="hover:text-gray-200">
            Contact
          </a>
        </nav>
        <div className="flex space-x-4">
          <button className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100">
            Login
          </button>
          <button className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
