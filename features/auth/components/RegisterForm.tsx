import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { useAuthStore } from "../store/auth.store";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onMutate: () => {
      setIsLoading(true);
      setError("");
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      useAuthStore.getState().setAuth(data.user, data.token);
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      const message =
        error.response?.data?.statusMsg === "fail"
          ? error.response.data.message || "Registration failed"
          : "Registration failed, please try again.";
      setError(message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }

    registerMutation.mutate({
      name,
      email,
      password,
      rePassword,
      phone,
    });
  };

  return (
    <div className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-4 shadow-lg flex items-start gap-3"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mt-0.5">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-red-800 text-sm mb-1">Oops!</h4>
            <p className="text-red-700 text-sm leading-relaxed">{error}</p>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 bg-white/50 backdrop-blur-sm transition-all duration-300 text-base placeholder-gray-400 shadow-sm hover:shadow-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 bg-white/50 backdrop-blur-sm transition-all duration-300 text-base placeholder-gray-400 shadow-sm hover:shadow-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 bg-white/50 backdrop-blur-sm transition-all duration-300 text-base placeholder-gray-400 shadow-sm hover:shadow-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 bg-white/50 backdrop-blur-sm transition-all duration-300 text-base placeholder-gray-400 shadow-sm hover:shadow-md"
            required
            minLength={6}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-emerald-200 focus:border-emerald-400 bg-white/50 backdrop-blur-sm transition-all duration-300 text-base placeholder-gray-400 shadow-sm hover:shadow-md"
            required
          />
        </div>

        <label className="flex items-center gap-3 text-sm p-3 bg-gray-50 rounded-2xl border-2 border-gray-100 cursor-pointer hover:border-emerald-200 transition-all group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 group-hover:scale-110 transition-all"
            required
          />
          <span className="text-gray-700 font-medium">
            I agree to the{" "}
            <span className="text-emerald-600 hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            &{" "}
            <span className="text-emerald-600 hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </span>
        </label>

        <button
          type="submit"
          disabled={registerMutation.isPending || isLoading}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
        >
          {registerMutation.isPending || isLoading ? (
            <>
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create New Account</span>
              <span className="group-hover:translate-x-1 transition-transform">
                ✨
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
