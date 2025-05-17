import React from "react";
import { Link } from "wouter";
import HeroSection from "@/components/common/hero-section";
import ContactForm from "@/components/common/contact-form";
import NewsletterForm from "@/components/common/newsletter-form";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Home, ChevronRight } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-cream py-3">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/">
              <a className="flex items-center hover:text-gold transition-colors">
                <Home size={14} className="mr-1" />
                Home
              </a>
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gold font-medium">Contacto</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection
        title="Entre em Contacto"
        subtitle="Estamos aqui para responder a todas as suas perguntas e ajudá-lo a encontrar a peça perfeita para qualquer ocasião."
        imageUrl="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
      />

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-6">
                Informações de Contacto
              </h2>
              <p className="text-gray-600 mb-8">
                Estamos sempre disponíveis para ajudar com qualquer dúvida ou pedido. Não hesite em contactar-nos através de qualquer um dos métodos abaixo ou visite a nossa loja.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkGray mb-1">Localização</h3>
                    <p className="text-gray-600">Av. da Liberdade, 123, Lisboa, Portugal</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkGray mb-1">Telefone</h3>
                    <p className="text-gray-600">+351 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkGray mb-1">Email</h3>
                    <p className="text-gray-600">info@matos1911.pt</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkGray mb-1">Horário de Funcionamento</h3>
                    <p className="text-gray-600">Segunda a Sexta: 10h às 19h</p>
                    <p className="text-gray-600">Sábado: 10h às 18h</p>
                    <p className="text-gray-600">Domingo: Fechado</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-darkGray mb-3">Siga-nos</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors duration-300">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
              Onde Estamos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visite nossa loja no coração de Lisboa para explorar nossa coleção completa.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-video w-full rounded-md overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.0775009525186!2d-9.146592!3d38.720517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933879f279c9d%3A0xa5f2396fe5bb93ef!2sAv.%20da%20Liberdade%2C%20Lisboa%2C%20Portugal!5e0!3m2!1spt-PT!2spt!4v1667491152597!5m2!1spt-PT!2spt" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da OuroElegance"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre nossos serviços.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-cream rounded-lg p-6">
                <h3 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                  Vocês oferecem garantia nas suas joias?
                </h3>
                <p className="text-gray-600">
                  Sim, oferecemos garantia vitalícia em todas as nossas peças contra defeitos de fabrico. Além disso, realizamos limpezas gratuitas e verificações periódicas para garantir que suas joias mantenham sua beleza e durabilidade.
                </p>
              </div>
              
              <div className="bg-cream rounded-lg p-6">
                <h3 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                  É possível encomendar peças personalizadas?
                </h3>
                <p className="text-gray-600">
                  Absolutamente! Oferecemos um serviço de design personalizado onde trabalhamos consigo para criar a peça dos seus sonhos. Desde anéis de noivado até joias comemorativas, nossos artesãos podem transformar sua visão em realidade.
                </p>
              </div>
              
              <div className="bg-cream rounded-lg p-6">
                <h3 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                  Qual é o prazo de entrega para compras online?
                </h3>
                <p className="text-gray-600">
                  Para produtos em stock, realizamos a entrega em 2-3 dias úteis para Portugal Continental. Peças personalizadas ou sob encomenda podem levar de 3 a 6 semanas, dependendo da complexidade do design e dos materiais utilizados.
                </p>
              </div>
              
              <div className="bg-cream rounded-lg p-6">
                <h3 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                  Como posso cuidar adequadamente das minhas joias?
                </h3>
                <p className="text-gray-600">
                  Recomendamos guardar suas joias separadamente em estojos apropriados, evitar o contacto com produtos químicos (perfumes, cremes, cloro) e remover suas peças durante atividades físicas. Oferecemos um serviço de limpeza e manutenção gratuito para todas as joias adquiridas na OuroElegance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterForm />
    </>
  );
};

export default ContactPage;
