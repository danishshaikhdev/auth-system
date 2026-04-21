import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Error } from "../components/Error";
import { Success } from "../components/Success";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(formData);
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-xl border border-gray-700">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <Error message={error} />
        )}

        {success && (
          <Success message={success} />
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          />

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

          <input
            name="confirm_password"
            type="password"
            required
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          />

          <button
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 p-3 rounded text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
