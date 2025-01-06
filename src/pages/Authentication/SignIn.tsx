import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: { access_token: string } = await response.json();
      console.log('API data====', data);
      localStorage.setItem('token', data.access_token);

      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please sign in to continue
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-sm text-center text-red-500">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white shadow-md ${
              loading
                ? 'bg-purple-400'
                : 'bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300'
            } transition-colors duration-200`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{' '}
          <a
            href="#"
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
