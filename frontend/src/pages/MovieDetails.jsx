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
  const listaFilmes = JSON.parse(localStorage.getItem("filmesFavoritos")) || [];

  const handleFavorite = async (movieId, acao) => {
    try {
      const uid_usuario = localStorage.getItem("user");
      await axios.post(
        `${BASE_URL}/movies/favoritar`,
        { movieId, uid_usuario, acao },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Atualiza localStorage corretamente
      let novaLista;
      if (acao === "favoritar") {
        novaLista = [...listaFilmes, movieId.toString()];
      } else {
        novaLista = listaFilmes.filter((id) => id !== movieId.toString());
      }
      localStorage.setItem("filmesFavoritos", JSON.stringify(novaLista));

      console.log("Ação realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
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
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="3x"
          className="text-gray-500"
        />
      </div>
    );

  if (!movie)
    return (
      <div className="text-center text-lg text-gray-700">
        Filme não encontrado.
      </div>
    );

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="my-6">
          <Link
            to="/"
            className="inline-flex items-center px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Voltar à lista de filmes
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Imagem do Filme */}
          <div className="lg:w-1/3 flex justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg border border-gray-300 w-full max-w-xs sm:max-w-md lg:max-w-full"
            />
          </div>

          {/* Informações do Filme */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {movie.title}
            </h1>
            <p className="text-xl text-gray-600 italic mb-6">{movie.tagline}</p>

            {/* Botão de Favoritar / Desfavoritar */}
            {isLoggedIn && (
              <button
                onClick={() =>
                  handleFavorite(
                    movie.id,
                    listaFilmes.includes(movie.id.toString())
                      ? "desfavoritar"
                      : "favoritar"
                  )
                }
                className={`px-5 py-3 rounded-lg text-white transition duration-300 mb-4 flex items-center justify-center ${
                  listaFilmes.includes(movie.id.toString())
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {listaFilmes.includes(movie.id.toString())
                  ? "Desfavoritar"
                  : "Favoritar"}
              </button>
            )}

            {/* Sinopse */}
            {movie.overview && (
              <div className="mb-6">
                <p className="font-semibold text-lg">Sinopse:</p>
                <p>{movie.overview}</p>
              </div>
            )}

            {/* Informações do Filme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
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
      </div>

      <Footer />
    </div>
  );
}
