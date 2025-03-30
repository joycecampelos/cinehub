import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useFetchFavorites } from "../hooks/useFetchFavorites";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useGenres } from "../hooks/useGenres";
import { useMoviesContext } from "../context/MoviesContext";

import Header from "../components/Header";
import Footer from "../components/Footer";

import axios from 'axios';
export default function Home() {
  const {
    searchQuery,
    setSearchQuery,
    submittedQuery,
    setSubmittedQuery,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    setCurrentPage,

  } = useMoviesContext();

  const { data: moviesFromFetch, loading: loadingFetch } =
    useFetchMovies(currentPage);
  const { data: moviesFromSearch, loading: loadingSearch } = useSearchMovies(
    submittedQuery,
    currentPage
  );

  const { data: favoriteMoviesData, loading: loadingFavorites } = useFetchFavorites();


  const genres = useGenres();

  const isLoggedIn = localStorage.getItem("user") !== null;

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchQuery);
    setCurrentPage(1); // Reset to page 1 after a new search
  };

  const handleFavorite = async (movieId, acao) => {
    try {

      const uid_usuario = localStorage.getItem('user');
      await axios.post('http://localhost:5000/api/movies/favoritar', { movieId, uid_usuario, acao }, {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`,
        },
      });
      console.log('Filme favoritado com sucesso!');
      window.location.reload(); 
      
    } catch (error) {
      console.log("error ==> ", error);
      console.error('Error signing up', error.response.data.error);
    }

  }

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Função para redefinir a busca e o filtro
  const handleReset = () => {
    setSelectedGenre(""); // Limpa o filtro de gênero
    setSearchQuery(""); // Limpa a busca
    setSubmittedQuery(""); // Limpa o estado de busca submetida
    setCurrentPage(1); // Volta para a primeira página
  };

  const movies = submittedQuery ? moviesFromSearch : moviesFromFetch;
  const loading = submittedQuery ? loadingSearch : loadingFetch;

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(Number(selectedGenre)))
    : movies;

  if (loading) return <div>Carregando filmes...</div>;

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/* Filtro por gênero e botão de redefinir busca */}
      <div className="container mx-auto px-10 mt-6 flex items-center space-x-4">
        <select
          onChange={handleGenreChange}
          value={selectedGenre}
          className="w-full sm:w-80 p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-300 ease-in-out"
        >
          <option value="" className="text-gray-500">
            Filtrar por gênero
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id} className="text-gray-700">
              {genre.name}
            </option>
          ))}
        </select>

        {/* Botão de redefinir busca */}
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Redefinir busca
        </button>
      </div>

      {/* Verifica se não há filmes após o filtro de gênero */}
      {filteredMovies.length === 0 && selectedGenre && (
        <div className="w-full h-full mx-auto my-8 p-8 bg-white rounded-md">
          <h1 className="text-2xl text-center font-bold text-gray-800">
            Nenhum filme encontrado para este gênero.
          </h1>
          <p className="text-gray-500 text-center">
            Selecione outra categoria ou retorne a tela inicial.
          </p>
        </div>
      )}

      {/* Grid de filmes */}
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {filteredMovies.map((movie) => (
            <Link
              to={`/movie/${ movie.id }`}
              key={movie.id}
              className="movie-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${ movie.poster_path }`}
                alt={movie.title}
              // Imagem proporcional com borda arredondada no topo
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {movie.title}
                </h3>
              </div>
              {isLoggedIn && (
                <div>
                  {favoriteMoviesData && favoriteMoviesData.includes(movie.id.toString()) ? (
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



              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-center mt-6 space-x-2 pt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300"
        >
          Anterior
        </button>

        <span className="text-lg font-medium text-gray-700">
          Página {currentPage}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={filteredMovies.length === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300"
        >
          Próxima
        </button>
      </div>

      <Footer />
    </div>
  );
}
