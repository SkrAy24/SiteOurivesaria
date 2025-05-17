import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/ui/logo";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);

  // Categorias no formato similar ao Tous
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categorias", href: "/categorias" },
    { name: "Produtos", href: "/produtos" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contacto", href: "/contacto" },
  ];

  // Detectar scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header 
      className={cn(
        "bg-white z-50 transition-all duration-300 border-b border-black fixed w-full top-0", 
        scrolled ? "py-2" : "py-4"
      )}
    >
      {/* Topo fixo com ícones de ação do usuário (Login/Cuenta, Carrito) */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Menu lateral - botão */}
          <button
            aria-label="Toggle Menu"
            className="text-black p-2"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo centralizado grande */}
          <div className="mx-auto">
            <Logo size={scrolled ? "medium" : "large"} />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/carrinho">
              <div className="text-black hover:text-burgundy transition-colors duration-300 relative p-2">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white text-xs h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            
            {user ? (
              <Link href="/conta">
                <div className="text-black hover:text-burgundy transition-colors duration-300 p-2">
                  <User className="h-5 w-5" />
                </div>
              </Link>
            ) : (
              <Link href="/auth">
                <div className="text-black hover:text-burgundy text-sm uppercase tracking-widest p-2">
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu lateral slide-in - estilo Tous */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50",
        menuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col overflow-y-auto pt-20 pb-6 px-6">
          <nav className="flex-1">
            <ul className="space-y-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div
                      className={cn(
                        "font-futura text-sm transition-colors duration-300 uppercase tracking-widest cursor-pointer",
                        location === link.href 
                          ? "text-burgundy font-medium" 
                          : "text-black hover:text-burgundy"
                      )}
                      onClick={closeMenu}
                    >
                      {link.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {user && (
            <div className="mt-auto pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="text-black hover:text-burgundy text-sm uppercase tracking-widest font-futura"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay para fechar menu quando clicado fora */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Navbar;
