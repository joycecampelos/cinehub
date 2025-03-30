import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMoviesContext } from '../context/MoviesContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const { setFavoriteMovies } = useMoviesContext();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
       axios.post('http://localhost:5000/api/user/login', {
            email,
            password,
        }).then((res) => {
            console.log("res.data ==> ", res.data);
            localStorage.setItem('user', res.data.userId);
            localStorage.setItem('token', res.data.token);
            setFavoriteMovies(res.data.filmesFavoritos); 
            


            navigate('/');	

        }).catch((err) => {
            setError(err.response.data.error);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <p className="text-center text-red-500"> {error} </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>

                    <Link to="/signup" className="block text-center mt-4 text-blue-500 hover:text-blue-700">Create an account</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;