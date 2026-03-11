"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaCode, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { authService } from "@/features/auth/api/auth.service";

export default function VerifyResetCodeForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [resetCode, setResetCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await authService.verifyResetCode(resetCode);
      setIsVerified(true);
      window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Invalid reset code. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Code Verified!
            </h2>
            <p className="text-gray-600">
              Redirecting to password reset...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-16 bg-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-600 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-600 rounded-full"></div>
        </div>
        <div className="relative z-10 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
              <Image src="/logo.png" alt="FreshCart" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-green-600">FreshCart</span>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-start justify-center flex-1 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Verify Your Code
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-medium">
            We have sent a verification code to your email. Enter the code below to continue.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaCode className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Enter Code</h3>
                <p className="text-sm text-gray-500">Check your email for the 6-digit code</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Verified</h3>
                <p className="text-sm text-gray-500">Verify your identity to reset password</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image src="/logo.png" alt="FreshCart" width={24} height={24} className="object-contain" />
              </div>
              <span className="text-2xl font-bold text-green-600">FreshCart</span>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-2xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enter Verification Code
              </h2>
              <p className="text-gray-600">
                We sent a code to <span className="font-semibold">{email}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaCode className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="resetCode"
                    placeholder="Enter 6-digit code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    maxLength={6}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400 text-center text-lg letter-spacing-2"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading || resetCode.length < 6}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Verifying...
                  </span>
                ) : (
                  <span>
                    <FaCheckCircle className="text-sm mr-2" />
                    Verify Code
                  </span>
                )}
              </button>
            </form>

            <div className="text-center mt-8">
              <Link 
                href="/forgot-password" 
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <FaArrowLeft />
                Back to Forgot Password
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Did not receive the code?{" "}
                <button className="text-green-600 font-semibold hover:text-green-700">
                  Resend
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

