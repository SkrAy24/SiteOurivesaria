import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag } from "lucide-react";
import { User as UserType } from "@shared/schema";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
  user: UserType | null;
  totalItems: number;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  user,
  totalItems,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden pb-6 animate-in slide-in-from-top bg-white">
      <div className="flex flex-col space-y-6 pt-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <div
              className="font-futura text-black hover:text-burgundy py-2 transition-colors duration-300 uppercase tracking-widest text-sm px-4 cursor-pointer"
              onClick={onClose}
            >
              {link.name}
            </div>
          </Link>
        ))}

        <div className="flex flex-col space-y-6 pt-4 border-t border-black px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="font-futura uppercase tracking-widest text-sm">Carrinho</span>
            <Link href="/carrinho">
              <div
                className="text-black hover:text-burgundy transition-colors duration-300 relative cursor-pointer"
                onClick={onClose}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {user ? (
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-futura uppercase tracking-widest text-sm">Minha Conta</span>
                <Link href="/conta">
                  <div
                    className="text-black hover:text-burgundy transition-colors duration-300 cursor-pointer"
                    onClick={onClose}
                  >
                    <User className="h-5 w-5" />
                  </div>
                </Link>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="text-black hover:text-burgundy text-sm uppercase tracking-widest font-futura text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth">
              <div 
                onClick={onClose}
                className="text-black hover:text-burgundy text-sm uppercase tracking-widest font-futura cursor-pointer"
              >
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
