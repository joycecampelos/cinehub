const e = require('express');
const service = require('./service');

exports.signup = async (req, res) => {
    try {

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Usuário, email e senha são obrigatórios" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
        }


         const response = await service.signup(username, email, password);
    

        return res.json({ token: response,  message: "Cadastro realizado com sucesso" });

    } catch (error) {
    console.log("error ==> ", error);
        res.status(500).json({ error: error.message });
   
    }

}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios" });
        }

         const response = await service.login(email, password);
         const {token, userId} = response;

         const filmesFavoritos = await service.getFavoritos(userId);
       

        res.json({ userId: userId, token : token , filmesFavoritos: filmesFavoritos, message: "Login realizado com sucesso" });

    } catch (error) {
        res.status(401).json({ error: error.message });

    }
}