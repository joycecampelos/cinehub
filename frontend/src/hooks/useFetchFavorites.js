import axios from "axios";
import { useState, useEffect } from "react";
export function useFetchFavorites(page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const uid_usuario = localStorage.getItem("user");

  useEffect(() => {
    setLoading(true);
    const fetchFavorites = async () => {
      try {
        const response = await axios.post( `http://localhost:5000/api/movies/getFavoritos`, {uid_usuario});
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setData([]); // Se der erro, define array vazio
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [page]);

  return { data, loading };
}
