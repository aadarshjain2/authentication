"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { PasswordInput } from "./PasswordInput";

function getStrength(pw: string): { label: string; color: string; width: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: "", color: "bg-gray-200", width: "w-0" },
    { label: "Weak", color: "bg-red-400", width: "w-1/4" },
    { label: "Fair", color: "bg-amber-400", width: "w-2/4" },
    { label: "Good", color: "bg-lime-500", width: "w-3/4" },
    { label: "Strong", color: "bg-emerald-500", width: "w-full" },
  ];
  return levels[score];
}

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const strength = getStrength(newPw);

  const handleSubmit = async () => {
    if (newPw !== confirm) return toast.error("Passwords don't match");
    if (newPw.length < 8) return toast.error("Password must be at least 8 characters");

    setLoading(true);
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: newPw }),
      });
      if (res.ok) {
        toast.success("Password updated");
        setCurrent(""); setNewPw(""); setConfirm("");
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err?.message ?? "Password change failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Change password</p>
      <div className="flex flex-col gap-3">
        <PasswordInput id="current" label="Current password" value={current} onChange={setCurrent} />
        <div>
          <PasswordInput id="new" label="New password" placeholder="Min. 8 characters" value={newPw} onChange={setNewPw} />
          {newPw && (
            <div className="mt-2">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
              </div>
              <p className="text-sm text-gray-400 mt-1">{strength.label}</p>
            </div>
          )}
        </div>
        <PasswordInput id="confirm" label="Confirm new password" value={confirm} onChange={setConfirm} />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-1 w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Updating…" : "Update password"}
        </button>
      </div>
    </div>
  );
}