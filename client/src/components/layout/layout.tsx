import React, { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* O pt-32 cria espaço suficiente para o cabeçalho fixo */}
      <main className="flex-grow pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
