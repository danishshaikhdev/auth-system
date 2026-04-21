import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Error } from "../components/Error";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      // 🚀 Gracefully show server error message
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl border border-gray-700">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <Error message={error} />
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          />

          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          />

          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
