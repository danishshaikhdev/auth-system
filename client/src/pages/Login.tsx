import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Error } from "../components/Error";
import { getErrorMessage } from "../utils/error";
import { LayoutDashboard } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    setError("");

    try {
      await login(formData);
      navigate("/");
      setDisabled(false);
    } catch (error) {
      // 🚀 Gracefully show server error message
      setError(getErrorMessage(error) || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] flex items-center justify-center px-6 py-12">

      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

        <div className="absolute -bottom-40 -right-40 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />

        <div className="absolute top-[40%] left-[50%] w-60 h-60 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/80 backdrop-blur-2xl shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-linear-to-br from-blue-600 via-purple-600 to-cyan-500 p-12 text-white">

          {/* Decorative Glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />

          {/* Top */}
          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <span className="text-sm font-semibold">
                Secure Authentication
              </span>
            </div>

            <h1 className="mt-8 text-6xl font-black leading-tight">
              Welcome
              <br />
              Back
            </h1>

            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-md">
              Access your personalized dashboard and securely manage your account with a beautiful modern experience.
            </p>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-4">

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <h2 className="text-3xl font-black">
                99%
              </h2>

              <p className="text-sm text-white/70 mt-1">
                Security
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <h2 className="text-3xl font-black">
                Fast
              </h2>

              <p className="text-sm text-white/70 mt-1">
                Login
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <h2 className="text-3xl font-black">
                Safe
              </h2>

              <p className="text-sm text-white/70 mt-1">
                Data
              </p>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          {/* Mobile Header */}
          <div className="lg:hidden mb-10 text-center">

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-linear-to-br from-blue-500 to-purple-600 shadow-xl">
              <LayoutDashboard className="w-10 h-10 text-white" />
            </div>

            <h2 className="mt-6 text-4xl font-black text-gray-800">
              Welcome Back
            </h2>

            <p className="mt-3 text-gray-500">
              Login to continue your journey.
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block">

            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />

              <span className="text-sm font-semibold text-blue-600">
                Login to continue
              </span>
            </div>

            <h2 className="mt-6 text-5xl font-black text-gray-800">
              Sign In
            </h2>

            <p className="mt-3 text-gray-500 text-lg">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6">
              <Error message={error} />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">

            {/* Email */}
            <div>

              <label className="text-sm font-bold text-gray-700 mb-3 block">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-800 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>

              <label className="text-sm font-bold text-gray-700 mb-3 block">
                Password
              </label>

              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-800 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">

              <button
                type="button"
                className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              disabled={loading || disabled}
              className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 px-6 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >

              {/* Shine */}
              <div className="absolute top-0 -left-full h-full w-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000" />

              <span className="relative z-10">
                {loading ? "Logging in..." : "Login"}
              </span>
            </button>

          </form>

          {/* Bottom */}
          <p className="mt-10 text-center text-gray-500">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-bold text-blue-500 hover:text-purple-500 transition-all"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
