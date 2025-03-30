const TMDB_API_KEY = process.env.TMDB_API_KEY;
const axios = require("axios");
const { supabase } = require("../db.js");

exports.getMovies = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=pt-BR&page=${page}`
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getMovieInfo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=pt-BR`
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.searchMovies = (query, page = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}&language=pt-BR`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.moviesGenres = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=pt-BR`
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.favoriteMovie = (movieId, uid_usuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: existingData, error: fetchError } = await supabase
        .from("tbl_filmesFavoritados")
        .select("*")
        .eq("uid_usuario", uid_usuario)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.log("fetchError ==> ", fetchError);
        throw new Error(fetchError.message);
      }

      if (existingData) {
        const updatedMovies = [...existingData.uid_filme, movieId];
        const { data, error: updateError } = await supabase
          .from("tbl_filmesFavoritados")
          .update({ uid_filme: updatedMovies })
          .eq("uid_usuario", uid_usuario)
          .select("*");
        if (updateError) {
          console.log("updateError ==> ", updateError);
          throw new Error(updateError.message);
        }
        resolve(data);
      } else {
        const { data, error: insertError } = await supabase
          .from("tbl_filmesFavoritados")
          .insert({ uid_usuario: uid_usuario, uid_filme: [movieId] })
          .select("*");
        if (insertError) {
          console.log("insertError ==> ", insertError);
          throw new Error(insertError.message);
        }
        resolve(data);
      }

      console.log("data ==> ", data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.desfavoritarMovie = (movieId, uid_usuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: existingData, error: fetchError } = await supabase
        .from("tbl_filmesFavoritados")
        .select("*")
        .eq("uid_usuario", uid_usuario)
        .single();

      if (fetchError) {
        console.log("fetchError ==> ", fetchError);
        throw new Error(fetchError.message);
      }

      if (existingData) {
        const updatedMovies = existingData.uid_filme.filter(
          (id) => id != movieId
        );
        const { data, error: updateError } = await supabase
          .from("tbl_filmesFavoritados")
          .update({ uid_filme: updatedMovies })
          .eq("uid_usuario", uid_usuario)
          .select("*");
        if (updateError) {
          console.log("updateError ==> ", updateError);
          throw new Error(updateError.message);
        }
        resolve(data);
      } else {
        throw new Error("No favorite movies found for the user.");
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.getFavoritos = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase
        .from("tbl_filmesFavoritados")
        .select("uid_filme")
        .eq("uid_usuario", userId);

      if (error) {
        console.log("error ==> ", error);
        console.error("Error fetching favoritos:", error.message);
        throw new Error(error.message);
      }
      resolve(data[0].uid_filme);
    } catch (error) {
      reject(error);
    }
  });
};
