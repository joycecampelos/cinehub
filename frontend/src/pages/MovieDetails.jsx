import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "http://localhost:5000/api"; // API do backend

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("user") !== null;
  const listaFilmes = JSON.parse(localStorage.getItem("filmesFavoritos"));

  const handleFavorite = async (movieId, acao) => {
    try {
      const uid_usuario = localStorage.getItem("user");
      await axios.post(
        "http://localhost:5000/api/movies/favoritar",
        { movieId, uid_usuario, acao },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Filme favoritado com sucesso!");
    } catch (error) {
      console.log("error ==> ", error);
      console.error("Error signing up", error.response.data.error);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar filme:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="container flex justify-center items-center h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="3x"
          className="text-gray-500"
        />
      </div>
    );

  if (!movie) return <div className="container">Filme não encontrado.</div>;

  return (
    <div>
      <Header />

      <div className="mx-5">
        <Link
          to="/"
          className="w-full block my-3 p-5 text-center bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-600 transition duration-300 flex items-center justify-center space-x-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />{" "}
          {/* Ícone de voltar */}
          <span>Voltar à lista de filmes</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Capa do filme */}
        <div className="lg:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg border border-gray-300"
            width={350}
          />
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {movie.title}
          </h1>
          <p className="text-xl text-gray-600 italic mb-6">{movie.tagline}</p>

          {isLoggedIn && (
            <div>
              {listaFilmes && listaFilmes.includes(movie.id.toString()) ? (
                <button
                  onClick={() => {
                    handleFavorite(movie.id, "desfavoritar");
                    localStorage.setItem(
                      "filmesFavoritos",
                      listaFilmes.filter((id) => id !== movie.id)
                    );
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mb-4 flex items-center space-x-2"
                >
                  <span>Desfavoritar</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleFavorite(movie.id, "favoritar");
                    localStorage.setItem(
                      "filmesFavoritos",
                      listaFilmes.push(movie.id)
                    );
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 mb-4 flex items-center space-x-2"
                >
                  <span>Favoritar</span>
                </button>
              )}
            </div>
          )}

          {movie.overview && (
            <div className="mb-6">
              <p className="font-semibold text-lg">Sinopse:</p>
              <p>{movie.overview}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p>
              <strong>Data de Lançamento:</strong>{" "}
              {formatDate(movie.release_date)}
            </p>
            <p>
              <strong>Nota:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Duração:</strong> {movie.runtime} min
            </p>
            <p>
              <strong>Gêneros:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
