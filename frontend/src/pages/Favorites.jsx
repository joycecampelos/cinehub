// src/pages/Favorites.js
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchFavorites } from "../hooks/useFetchFavorites";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
const BASE_URL = "http://localhost:5000/api";
export default function Favorites() {
  const { data: favoriteMoviesData, loading: loadingFavorites } =
    useFetchFavorites();

  const [movies, setMovies] = useState([]);
  const filteredMovies = new Set(movies.map((movie) => movie.id));
  const fetchMovies = () => {
    if (favoriteMoviesData && favoriteMoviesData.length > 0) {
      favoriteMoviesData.forEach(async (movieId) => {
        if (filteredMovies.has(movieId)) {
          return;
        }
        filteredMovies.add(movieId);

        await axios
          .get(`${BASE_URL}/movies/movie/${movieId}`)
          .then((res) => {
            setMovies((prevMovies) => [...prevMovies, res.data]);
          })
          .catch((error) => {
            console.error("Erro ao buscar filme:", error);
          });
      });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [favoriteMoviesData]);

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
      window.location.reload();
    } catch (error) {
      console.log("error ==> ", error);
      console.error("Error signing up", error.response.data.error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="w-full h-full mx-auto my-8 p-8 bg-white rounded-md">
          <h1 className="text-2xl text-center font-bold text-gray-800">
            Meus Favoritos
          </h1>
          {movies.length === 0 && !loadingFavorites && (
            <p className="text-gray-500 text-center">
              Você ainda não tem filmes favoritos. <br /> Faça o login e
              adicione filmes à lista.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="movie-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="p-4 flex flex-col justify-between h-full">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {movie.title}
              </h3>
            </div>

            <div>
              {favoriteMoviesData &&
              favoriteMoviesData.includes(movie.id.toString()) ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavorite(movie.id, "desfavoritar");
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 mb-4 flex items-center space-x-2"
                >
                  <span>Desfavoritar</span>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFavorite(movie.id, "favoritar");
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 mb-4 flex items-center space-x-2"
                >
                  <span>Favoritar</span>
                </button>
              )}
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}
