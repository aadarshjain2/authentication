"use client"

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "../common/Button";
import Link from "next/link";
import GradientBackground from "./GradientBackground";
import Card from "./Cards";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import Checkbox from "./Checkbox";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import { useLoginForm } from "@/hooks/useLoginForm";
const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
 
const { form, errors, handleChange, handleSubmit , loading} = useLoginForm();
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
                  value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                 
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
                  value={form.password}
                   onChange={(e) => handleChange("password", e.target.value)}
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
                <Link href="/forgot-password">Forgot password?</Link>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg px-4 py-2.5 transition flex items-center justify-center gap-2"
                >
                  {loading ? "Sending..." : "Login"}
                </button>

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