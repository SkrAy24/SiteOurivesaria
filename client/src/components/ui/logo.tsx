import React from "react";
import { Link } from "wouter";

interface LogoProps {
  size?: "large" | "medium" | "small";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    large: "text-4xl md:text-5xl",
    medium: "text-3xl",
    small: "text-2xl",
  };

  return (
    <Link href="/">
      <div className={`flex items-center justify-center cursor-pointer ${className}`}>
        <div className={`${sizeClasses[size]} font-futura tracking-widest uppercase text-black text-center`}>
          Matos<span className="font-light">1911</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
