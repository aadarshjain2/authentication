import { LucideIcon } from "lucide-react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface FormHeaderProps {
  title: string;
  subtitle: string;
}

export interface InputFieldProps {
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

export interface PasswordFieldProps {
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

export interface CheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}


// left side component in login and signup page 

  export interface IconBadgeProps {
      icon: React.ReactNode;
      size?: "sm" | "md" | "lg";
      variant?: "light" | "dark";
    }

      export  interface HeroSectionProps {
      title: string;
      description: string;
      icon?: React.ReactNode;
      showProgress?: boolean;
    }

      // Gradient Background Component
    export interface GradientBackgroundProps {
      children: React.ReactNode;
      variant?: "default" | "dark" | "light";
    }

   
export interface AnimatedBlobProps {
  color: string;
  position: string;
  delay?: string;
}

export interface ProgressDotsProps {
  count?: number;
  activeIndex?: number;
  color?: string;
}