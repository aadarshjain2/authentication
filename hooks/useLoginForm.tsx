import { useState } from "react";
import { validateAuthForm } from "@/utils/validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useLoginForm = () => {
  const [form, setForm] = useState({
    
    email: "",
    password: "",
    rememberMe : "",
  });

  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateAuthForm(form, "login");

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        toast.error(data.message || "login failed");
      }
    } catch {
      toast.error("Login error");
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
};