"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userData";
import { ProfileCard } from "@/components/UserProfile/ProfileCard";
import { PasswordForm } from "@/components/UserProfile/PasswordForm";

export default function UserProfile() {
  const data = useUserStore((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (data) { setName(data.name); setEmail(data.email); }
  }, [data]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gray-900">Account settings</h1>
      <ProfileCard name={name} email={email} />
      <PasswordForm />
    </div>
  );
}