"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();

  const token = params.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded-lg w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}