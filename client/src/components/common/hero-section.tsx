import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageUrl,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}) => {
  return (
    <section className="relative h-[95vh] bg-cover bg-center flex items-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.9)",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-futura text-white mb-8 uppercase tracking-wide font-light">
            {title}
          </h1>
          <p className="text-base md:text-lg text-white mb-10 max-w-2xl mx-auto tracking-wider font-light">
            {subtitle}
          </p>
          
          {(primaryButtonText || secondaryButtonText) && (
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 justify-center mt-12">
              {primaryButtonText && primaryButtonLink && (
                <Link href={primaryButtonLink}>
                  <button className="gucci-button px-8 py-3 min-w-[200px]">
                    {primaryButtonText.toUpperCase()}
                  </button>
                </Link>
              )}
              
              {secondaryButtonText && secondaryButtonLink && (
                <Link href={secondaryButtonLink}>
                  <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest px-8 py-3 min-w-[200px] font-light">
                    {secondaryButtonText.toUpperCase()}
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
