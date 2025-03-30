const express = require('express');
const router = express.Router();
const controller = require('./controller.js');


router.get("/getMovies", controller.getMovies);
router.get("/movie/:id", controller.getMovieInfo);
router.get("/search", controller.searchMovies);
router.get("/genres/", controller.moviesGenres);
router.post("/favoritar/", controller.favoriteMovie);


module.exports = router;