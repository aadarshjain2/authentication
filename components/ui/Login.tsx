"use client"

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "../common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GradientBackground from "./GradientBackground";
import { toast } from "react-toastify";
import Card from "./Cards";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import Checkbox from "./Checkbox";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import { validateAuthForm } from "@/lib/utils/validation";
const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


  const formData = { email, password };

      const validationErrors = validateAuthForm(formData, "login");

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }


    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( formData),
      });

      const data = await res.json();

      if (res.ok) {
        setEmail("");
        setPassword("");
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }

    } catch (error) {
      toast.error("Server error during login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full">

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">

        <div className="w-full max-w-md space-y-8">

          <FormHeader
            title="Welcome Back"
            subtitle="Login to your account to continue"
          />

          <Card className="p-6 sm:p-8 shadow-sm">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <InputField
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <PasswordField
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <Checkbox
                  id="remember"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Link href="#">Forgot password?</Link>
              </div>

              <Button type="submit" variant="primary" fullWidth>
                Login
              </Button>

            </form>

            <FormFooter
              text="Dont have an account?"
              linkText="Sign Up"
              linkHref="/signup"
            />

          </Card>
        </div>
      </div>

      <GradientBackground/>

    </div>
  );
};

export default Login;