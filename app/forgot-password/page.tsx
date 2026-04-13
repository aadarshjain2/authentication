"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  setLoading(true);

  try {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setSubmitted(true);
      setMessage(data.message || "Reset email sent");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  } catch (error) {
    setMessage("Server error. Try again.");
  }

  setLoading(false);
};

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">

          {/* Icon */}
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          {!submitted ? (
            <>
              <h1 className="text-xl font-semibold text-gray-900 mb-1">
                Forgot your password?
              </h1>

              <p className="text-sm text-gray-600 mb-6">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-700 mb-1.5"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg px-4 py-2.5 transition flex items-center justify-center gap-2"
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Check your inbox
              </h2>

              <p className="text-sm text-gray-600">
                We sent a reset link to{" "}
                <span className="font-medium text-gray-900">{email}</span>
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="mt-5 text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>

        <p className="text-center mt-5 text-sm text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700">
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}