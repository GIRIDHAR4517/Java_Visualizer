import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../Services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState({ error: "", success: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = () => {
    if (form.password.length < 6) return "Weak";
    if (form.password.length < 10) return "Medium";
    return "Strong";
  };

  const handleRegister = async () => {
    // Reset both states at the start of a new attempt
    setRes({ error: "", success: "" });

    if (form.password !== form.confirmPassword) {
      setRes({ error: "Passwords do not match", success: "" });
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiRequest("http://192.168.1.15:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      // Based on our Java ApiResponse structure: { success: boolean, message: string }
      if (data.success) {
        setRes({ error: "", success: data.message });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        // Optional: setForm({ name: "", ... }) to clear the fields on success
      } else {
        setRes({ error: data.message || "Registration failed", success: "" });
      }
    } catch (err) {
      // Handling HTTP errors (409 Conflict, 400 Bad Request, etc.)
      const msg = err.response?.data?.message || "Connection to server failed";
      setRes({ error: msg, success: "" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8">
        {/* Header */}

        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl">
            <UserPlus size={32} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Create Account
          </h1>

          <p className="text-slate-400 text-sm">Sign up to get started</p>
        </div>

        {/* Error */}

        {/* Error Alert */}
        {res.error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm flex items-center gap-2 animate-in fade-in duration-300">
            <span>✖</span> {res.error}
          </div>
        )}

        {/* Success Alert */}
        {res.success && (
          <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 px-4 py-2 rounded-lg text-sm flex items-center gap-2 animate-in fade-in duration-300">
            <span>✔</span> {res.success}
          </div>
        )}

        {/* Name */}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Username */}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Username
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              name="username"
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Email */}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Password */}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {form.password && (
            <p className="text-xs text-slate-400 mt-1">
              Strength: {getPasswordStrength()}
            </p>
          )}
        </div>

        {/* Confirm Password */}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {/* Register Button */}

        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Register
            </>
          )}
        </button>

        {/* Login Link */}

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{" "}
            <span
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
