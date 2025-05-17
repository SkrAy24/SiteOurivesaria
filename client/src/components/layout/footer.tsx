import React from "react";
import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-futura uppercase tracking-widest mb-6">Matos1911</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Requinte e elegância em cada detalhe. Desde 1911 criando joias que contam histórias.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-futura uppercase tracking-widest mb-6">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Sobre Nós</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/categorias">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Categorias</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/produtos">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Produtos</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/contacto">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Contacto</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-futura uppercase tracking-widest mb-6">Categorias</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categorias/aneis">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Anéis</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/categorias/colares">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Colares</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/categorias/pulseiras">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Pulseiras</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/categorias/relogios">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Relógios</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/categorias/brincos">
                  <div className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer flex items-center group">
                    <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm uppercase">Brincos</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-futura uppercase tracking-widest mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-white mt-1 mr-3" size={16} />
                <span className="text-gray-300 text-sm">
                  Av. da Liberdade, 123, Lisboa, Portugal
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="text-white mt-1 mr-3" size={16} />
                <span className="text-gray-300 text-sm">+351 123 456 789</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-white mt-1 mr-3" size={16} />
                <span className="text-gray-300 text-sm">info@matos1911.pt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Matos1911. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
            <Link href="/privacy">
              <div className="text-gray-400 hover:text-white transition-colors duration-300 uppercase text-xs tracking-wide cursor-pointer">
                Política de Privacidade
              </div>
            </Link>
            <Link href="/terms">
              <div className="text-gray-400 hover:text-white transition-colors duration-300 uppercase text-xs tracking-wide cursor-pointer">
                Termos e Condições
              </div>
            </Link>
            <Link href="/faq">
              <div className="text-gray-400 hover:text-white transition-colors duration-300 uppercase text-xs tracking-wide cursor-pointer">
                FAQ
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
