import { createContext, useState, useContext } from "react";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const value = {
    searchQuery,
    setSearchQuery,
    submittedQuery,
    setSubmittedQuery,
    selectedGenre,
    setSelectedGenre,
    currentPage,
    setCurrentPage,  
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export const useMoviesContext = () => useContext(MoviesContext);
