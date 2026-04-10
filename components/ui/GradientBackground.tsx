import React from 'react'
import { AnimatedBlobProps, GradientBackgroundProps, HeroSectionProps, IconBadgeProps, ProgressDotsProps } from '../types/form.types';

const GradientBackground = () => {

    const IconBadge = ({ icon, size = "md", variant = "light" }: IconBadgeProps) => {
      const sizes = {
        sm: "p-2",
        md: "p-3",
        lg: "p-4"
      };
    
      const variants = {
        light: "bg-white/10 backdrop-blur-sm text-white",
        dark: "bg-black/10 backdrop-blur-sm text-foreground"
      };
    
      return (
        <div className={`inline-flex rounded-full ${sizes[size]} ${variants[variant]} mb-4`}>
          {icon}
        </div>
      );
    };


const AnimatedBlob = ({ color, position, delay = "" }: AnimatedBlobProps) => (
  <div className={`absolute ${position} w-72 h-72 ${color} rounded-full mix-blend-screen filter blur-xl opacity-70 animate-blob ${delay}`} />
);

const GradientWave = () => (
  <div className="absolute inset-0 opacity-20">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 560">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path fill="url(#gradient1)" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z" />
    </svg>
  </div>
);


const ProgressDots = ({ count = 3, activeIndex = 2, color = "white" }: ProgressDotsProps) => (
  <div className="flex justify-center gap-2 pt-4">
    {Array.from({ length: count }).map((_, index) => (
      <div 
        key={index}
        className={`w-2 h-2 rounded-full bg-${color}/${index <= activeIndex ? (100 - (activeIndex - index) * 20) : 40}`}
      />
    ))}
  </div>
);
    
    
    const HeroSection = ({ title, description, icon, showProgress = true }: HeroSectionProps) => (
      <div className="text-center space-y-6 max-w-md">
        {icon && (
          <IconBadge icon={icon} size="md" variant="light" />
        )}
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          {title}
        </h2>
        <p className="text-lg text-white/80">
          {description}
        </p>
        {showProgress && <ProgressDots count={3} activeIndex={2} color="white" />}
      </div>
    );
    

  
    
    const GradientBackground = ({ children, variant = "dark" }: GradientBackgroundProps) => {
      const variants = {
        default: "bg-gradient-to-br from-background to-secondary",
        dark: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
        light: "bg-gradient-to-br from-white via-blue-50 to-purple-50"
      };
    
      return (
        <div className={`hidden lg:flex flex-1 relative overflow-hidden`}>
          <div className={`absolute inset-0 ${variants[variant]}`} />
          
          <div className="absolute inset-0">
            <AnimatedBlob color="bg-purple-500/30" position="top-0 -left-4" />
            <AnimatedBlob color="bg-cyan-500/30" position="top-0 -right-4" delay="animation-delay-2000" />
            <AnimatedBlob color="bg-indigo-500/30" position="-bottom-8 left-20" delay="animation-delay-4000" />
          </div>
    
          <GradientWave />
          
          <div className="relative z-10 flex items-center justify-center p-8 lg:p-12 w-full">
            {children}
          </div>
        </div>
      );
    };

  return (
   <GradientBackground variant="dark">
        <HeroSection
          title="Secure Authentication"
          description="Your data is protected with industry-standard encryption and security measures. Sign in with confidence."
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          showProgress
        />
      </GradientBackground>
  )
}

export default GradientBackground