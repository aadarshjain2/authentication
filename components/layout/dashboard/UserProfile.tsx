"use client";

import { useUserStore } from "@/store/userData";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function UserProfile() {
  const data = useUserStore((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [data]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      toast.error("Password change failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {/* User Info */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <p className="mb-2">
          <strong>Name:</strong> {name}
        </p>

        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>

      {/* Change Password */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-white border p-4 rounded"
      >
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}