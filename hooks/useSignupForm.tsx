import { useState } from "react";
import { validateAuthForm } from "@/utils/validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const useSignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateAuthForm(form, "signup");

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup Successful");
        router.push("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch {
      toast.error("Signup error");
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
};