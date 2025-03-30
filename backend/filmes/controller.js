const TMDB_API_KEY = process.env.TMDB_API_KEY; // Definir no .env
const axios = require("axios");
const service = require('./service.js');


exports.getMovies = async (req, res) => {
    try {
        const page = req.query.page || 1;

        const filmes = await service.getMovies(page);

        res.json(filmes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}
exports.getMovieInfo = async (req, res) => {
    try {  
        const { id } = req.params;

        const filmeInfo = await service.getMovieInfo(id);
  
        res.json(filmeInfo);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}
exports.searchMovies = async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
            if (!query) {
                return res.status(400).json({ error: "Query de pesquisa é obrigatória" });
            }


        const movies = await service.searchMovies(query, page);

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}

exports.moviesGenres = async (req, res) => {
    try {
        
        const genres = await service.moviesGenres();

        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}

exports.favoriteMovie = async (req, res) => {
    try {
        const {movieId, uid_usuario, acao} = req.body; 
        let response = null;
        if(acao == "favoritar"){ 
            response = await service.favoriteMovie(movieId, uid_usuario);

        } else if(acao == "desfavoritar"){
            response = await service.desfavoritarMovie(movieId, uid_usuario);
        }

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }

}
exports.getFavoritos = async (req, res) => {
    try {
        const {uid_usuario} = req.body; 

        const favoritos = await service.getFavoritos(uid_usuario);

        res.json(favoritos);
    } catch (error) {
    console.log("error ==> ", error);
        res.status(500).json({ error: "Erro ao buscar filmes" });
    }
}

