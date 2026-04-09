"use client"

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LucideIcon, User } from "lucide-react";
import { Button } from "../common/Button";
import Link from "next/link";
import GradientBackground from "./GradientBackground";
import { useRouter } from "next/navigation";

// Google Icon Component
interface GoogleIconProps {
  className?: string;
}

const GoogleIcon = ({ className }: GoogleIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-card border border-border rounded-lg ${className}`}>
    {children}
  </div>
);

// Form Header Component
interface FormHeaderProps {
  title: string;
  subtitle: string;
}

const FormHeader = ({ title, subtitle }: FormHeaderProps) => (
  <div className="text-center space-y-2">
    <h1 className="text-3xl font-bold tracking-tight text-foreground">
      {title}
    </h1>
    <p className="text-muted-foreground">
      {subtitle}
    </p>
  </div>
);

// Input Field Component
interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  required?: boolean;
  className?: string;
}

const InputField = ({ 
  id, 
  type, 
  label, 
  placeholder, 
  value, 
  onChange, 
  icon: Icon, 
  required = false,
  className = ""
}: InputFieldProps) => (
  <div className="space-y-2">
    <label 
      htmlFor={id} 
      className="text-sm font-medium text-foreground"
    >
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-11 pl-10 pr-3 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ${className}`}
        required={required}
      />
    </div>
  </div>
);

// Password Field Component
interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  required?: boolean;
  className?: string;
}

const PasswordField = ({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  showPassword, 
  onTogglePassword, 
  required = false,
  className = ""
}: PasswordFieldProps) => (
  <div className="space-y-2">
    <label 
      htmlFor={id} 
      className="text-sm font-medium text-foreground"
    >
      {label}
    </label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-11 pl-10 pr-10 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ${className}`}
        required={required}
      />
      <button
        type="button"
        onClick={onTogglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </div>
);



interface FormFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

const FormFooter = ({ text, linkText, linkHref }: FormFooterProps) => (
  <p className="mt-6 text-center text-sm text-muted-foreground">
    {text}{" "}
    <Link href={linkHref}>
      {linkText}
    </Link>
  </p>
);

// ============================================================================
// MAIN SIGNIN COMPONENT
// ============================================================================

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