import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Adicione o estado de carregamento

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Defina o estado de carregamento como verdadeiro
    try {
      await axios.post('http://localhost:5000/api/user/signup', formData)
        .then((res) => {
          localStorage.setItem('token', res.data.token);

          navigate('/');
        }).catch((err) => {
          console.log(err);
        });

    } catch (error) {
      console.log("error ==> ", error);
      setError(error.response.data.error);
      console.error('Error signing up', error.response.data.error);
    } finally {
      setLoading(false); // Defina o estado de carregamento como falso
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <p className="text-center text-red-500"> {error} </p>
        {loading ? ( // Renderize a mensagem de carregamento se estiver carregando
          <p className="text-center text-blue-500">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
            <Link to="/login" className="block text-center mt-4 text-blue-500 hover:text-blue-700">Already have an account?</Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
