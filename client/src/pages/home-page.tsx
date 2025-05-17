import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product, Category, Testimonial } from "@shared/schema";
import HeroSection from "@/components/common/hero-section";
import CategoryGrid from "@/components/categories/category-grid";
import ProductCard from "@/components/products/product-card";
import TestimonialCard from "@/components/common/testimonial-card";
import ContactForm from "@/components/common/contact-form";
import NewsletterForm from "@/components/common/newsletter-form";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Loader2 } from "lucide-react";

const HomePage: React.FC = () => {
  // Fetch featured products
  const {
    data: featuredProducts,
    isLoading: isFeaturedLoading
  } = useQuery<Product[]>({ 
    queryKey: ["/api/products/featured"]
  });

  // Fetch categories
  const {
    data: categories,
    isLoading: isCategoriesLoading
  } = useQuery<Category[]>({ 
    queryKey: ["/api/categories"]
  });

  // Fetch testimonials
  const {
    data: testimonials,
    isLoading: isTestimonialsLoading
  } = useQuery<Testimonial[]>({ 
    queryKey: ["/api/testimonials"]
  });

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Requinte e Elegância em Cada Detalhe"
        subtitle="Descubra a nossa coleção exclusiva de joias e relógios de luxo."
        imageUrl="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
        primaryButtonText="Ver Coleção"
        primaryButtonLink="/categorias"
        secondaryButtonText="Contacte-nos"
        secondaryButtonLink="/contacto"
      />

      {/* Categories Section */}
      <section id="categorias" className="py-16 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <CategoryGrid
            categories={categories || []}
            isLoading={isCategoriesLoading}
            title="Nossas Categorias"
            description="Explore as nossas categorias cuidadosamente selecionadas para encontrar peças que combinam com o seu estilo único."
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="produtos" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
                Produtos em Destaque
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nossas peças mais exclusivas, selecionadas especialmente para você.
              </p>
            </div>

            {isFeaturedLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </div>
            ) : featuredProducts?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Nenhum produto encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(featuredProducts || []).map((product) => (
                  <ProductCard key={product.id} product={product} hideRating={true} />
                ))}
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/produtos">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300 font-medium btn-hover"
                size="lg"
              >
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 bg-darkGray text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Sobre a Matos1911</h2>
              <p className="mb-4">Na Matos1911, acreditamos que cada joia conta uma história única. Fundada em 1985, nossa ourivesaria tem sido sinônimo de qualidade e excelência no mercado de joias de luxo.</p>
              <p className="mb-4">Trabalhamos apenas com os melhores materiais e artesãos para criar peças que transcendem gerações, combinando técnicas tradicionais com designs contemporâneos.</p>
              <p className="mb-6">Cada peça que criamos é um testemunho do nosso compromisso com a perfeição e atenção aos detalhes.</p>
              <div className="flex space-x-4">
                <Link href="/sobre#valores">
                  <a className="text-gold hover:underline font-medium">Nossos Valores</a>
                </Link>
                <Link href="/sobre#historia">
                  <a className="text-gold hover:underline font-medium">Nossa História</a>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600003263720-95b45a4035d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Interior da nossa ourivesaria" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-gold text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Qualidade Premium</h3>
              <p className="text-gray-300">Utilizamos apenas os materiais mais finos e pedras preciosas certificadas em nossas criações.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Artesanato Impecável</h3>
              <p className="text-gray-300">Cada peça é meticulosamente criada por artesãos experientes com décadas de prática.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Garantia Vitalícia</h3>
              <p className="text-gray-300">Oferecemos garantia vitalícia em todas as nossas peças, demonstrando nossa confiança na durabilidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">O Que Nossos Clientes Dizem</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Descubra por que nossos clientes confiam em nós para os momentos mais importantes de suas vidas.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isTestimonialsLoading ? (
                <div className="col-span-3 flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
              ) : (
                testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contacto" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-6">Contacte-nos</h2>
              <p className="text-gray-600 mb-8">Estamos aqui para responder a todas as suas perguntas e ajudá-lo a encontrar a peça perfeita para qualquer ocasião.</p>
              
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
                    <p className="text-gray-600">info@ouroelegance.pt</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gold mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-darkGray mb-1">Horário de Funcionamento</h3>
                    <p className="text-gray-600">Segunda a Sábado: 10h às 19h</p>
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

      {/* Newsletter Section */}
      <NewsletterForm />
    </>
  );
};

export default HomePage;
