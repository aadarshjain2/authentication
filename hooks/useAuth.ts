import { useEffect } from "react";
import { useUserStore } from "@/store/userData";

export const useAuth = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetch("/api/me")
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
        });
    }
  }, [user, setUser]);

  return user;
};