import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ searchQuery, setSearchQuery, handleSearchSubmit }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // Obtém a URL atual

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-red-500 hover:text-red-700 transition-all duration-300"
        >
          🎬 Cinehub
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <Link
              to="/"
              className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
            >
              Filmes
            </Link>
            <Link
              to="/favorites"
              className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
            >
              Favoritos
            </Link>
          </nav>

          {location.pathname === "/" && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 w-64 md:w-80 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Buscar filmes..."
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                aria-label="Buscar filmes"
              >
                Buscar
              </button>
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-lg font-medium hover:text-red-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium hover:text-red-500 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 right-0 w-64 h-full bg-gray-800 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-50`}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Fechar menu"
        >
          ✖
        </button>
        <nav className="mt-16 flex flex-col space-y-6 text-center">
          <Link
            to="/"
            className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
            onClick={toggleMenu}
          >
            Filmes
          </Link>
          <Link
            to="/favorites"
            className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
            onClick={toggleMenu}
          >
            Favoritos
          </Link>

          {location.pathname === "/" && (
            <div className="px-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Buscar filmes..."
              />
              <button
                onClick={handleSearchSubmit}
                className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
              >
                Buscar
              </button>
            </div>
          )}

          <div className="mt-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-lg font-medium text-white hover:text-red-500 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
