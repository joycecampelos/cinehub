require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { supabase } = require("./db.js");
const userRoutes = require('./user/routes.js');
const movieRoutes = require('./filmes/routes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

supabase.auth.getSession().then(response => {
  console.log("Conectado ao banco de dados Supabase");
}).catch(err => { console.error(err) })
