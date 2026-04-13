"use client"

import { useState } from "react";
import { Mail, User } from "lucide-react";
import { Button } from "../common/Button";
import GradientBackground from "./GradientBackground";
import FormHeader from "./FormHeader";
import Card from "./Cards";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import FormFooter from "./FormFooter";
import { useSignupForm } from "@/hooks/useSignupForm";


const SignIn = () => {
   const [showPassword, setShowPassword] = useState(false);

  const { form, errors, handleChange, handleSubmit } = useSignupForm();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full">
    
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <FormHeader
            title="Welcome"
            subtitle="Sign Up to your account to continue"
          />

          <Card className="p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">

              <InputField
                id="name"
                type="text"
                label="Name"
                placeholder="Enter the Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}

                icon={User}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}

              <InputField
                id="email"
                type="email"
                label="Email"
                placeholder="name@example.com"
                 value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                
                icon={Mail}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
              <PasswordField
                id="password"
                label="Password"
                placeholder="Enter your password"
                
                 value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}

              <Button type="submit" variant="primary" fullWidth>
                Sign Up
              </Button>


            </form>

            <FormFooter
              text="Already have an account?"
              linkText="Login"
              linkHref="/login"
            />
          </Card>
        </div>
      </div>
      <GradientBackground />
    </div>
  );
};

export default SignIn;