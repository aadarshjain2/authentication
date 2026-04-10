"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserStore } from "@/store/userData";

interface LogoutProps {
  className?: string;
}

export default function LogoutButton({ className }: LogoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const {setUser} = useUserStore();



  const handleLogout = async () => {
    setLoading(true);

    await fetch("/api/logout", { method: "POST" });
  
    router.push("/login");
    setUser(null)
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}