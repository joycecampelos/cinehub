## CineHub - Projeto de Filmes
Este é um projeto full-stack que combina Vite + React no frontend e Node.js + Express no backend para exibir filmes populares e detalhes de filmes. O frontend consome a API do backend, que por sua vez utiliza a API pública da The Movie Database (TMDb).

## Tecnologias Utilizadas

Frontend:
 - Vite
 - React
 - Axios
 - Tailwind CSS

Backend:
 - Node.js
 - Express
 - Axios

## Instruções de Instalação

## Passo 1: Clonar o Repositório
Primeiro, clone este repositório para sua máquina local:

``git clone https://github.com/joycecampelos/cinehub``
``cd cinehub``

## Passo 2: Instalar Dependências
Instale as dependências tanto para o frontend quanto para o backend.

## Backend:

```
cd backend
npm install
```

## Frontend:

```
cd ..
cd frontend
npm install
```

## Passo 3: Configurar o Backend
Crie um arquivo .env na pasta ``raiz`` e adicione sua API Key da The Movie Database (TMDb):

Utilize o arquivo .env-example como referência.

```
TMDB_API_KEY=
PORT=5000
SUPABASE_KEY=
DB_PASS=
DATABASE_URL=
```

## Passo 4: Rodar o Projeto
Na raiz do projeto, use o comando abaixo para rodar o frontend e o backend simultaneamente:

```
npm install
npm run start
```

## Esse comando executará o seguinte:
1. O backend estará rodando na porta 5000 e fornecerá as rotas:

   - GET /api/movies: Retorna filmes populares.
   - GET /api/movie/:id: Retorna detalhes de um filme específico.

O frontend estará rodando na porta 5173, onde você verá a interface para buscar e exibir filmes populares e detalhes.

## Passo 5: Acessar o Projeto
1. Após rodar o comando npm run start, você pode acessar o projeto em:
    - Frontend: http://localhost:5173
    - Backend: http://localhost:5000/api/movies
