"use client"

import { useState } from "react";
import {  Mail, User } from "lucide-react";
import { Button } from "../common/Button";
import GradientBackground from "./GradientBackground";
import { useRouter } from "next/navigation";
import FormHeader from "./FormHeader";
import Card from "./Cards";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import FormFooter from "./FormFooter";


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name , setName] = useState("")
  const [rememberMe, setRememberMe] = useState(false);
const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

   let res =  await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ name ,email, password }),
    });

  setEmail("")
  setPassword("")
  setName("")
  if(res.ok){
      router.push("/login")

  }
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full">
      {/* Left Side - Sign In Form */}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={User}
                required
              />
              
              <InputField
                id="email"
                type="email"
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <PasswordField
                id="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                required
              />


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
 <GradientBackground/>
    </div>
  );
};

export default SignIn;