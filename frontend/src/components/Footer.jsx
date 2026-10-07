import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-6">
        {/* Logo */}
        <div className="mb-4 text-center">
          <a href="/" className="hover:text-red-500">
            <h1 className="text-2xl font-bold text-red-500">🎬 Cinehub</h1>
          </a>
        </div>

        {/* Links de Navegação */}
        <nav className="flex flex-col sm:flex-row sm:gap-4 gap-6 text-center">
          <Link to="/" className="hover:text-red-500 text-lg">
            Filmes
          </Link>
          <Link to="/favorites" className="hover:text-red-500 text-lg">
            Favoritos
          </Link>
        </nav>

        {/* Informações de Copyright */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">&copy; 2025 Cinehub.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
