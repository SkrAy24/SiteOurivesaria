import React from "react";
import { Link } from "wouter";
import HeroSection from "@/components/common/hero-section";
import NewsletterForm from "@/components/common/newsletter-form";
import { CheckCircle2, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage: React.FC = () => {
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
            <span className="text-gold font-medium">Sobre</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection
        title="A Nossa História"
        subtitle="Descubra a tradição e excelência que nos definem desde 1985."
        imageUrl="https://images.unsplash.com/photo-1600003263720-95b45a4035d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
      />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
                A Nossa Ourivesaria
              </h2>
              <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Fundada em 1985, a <span className="text-gold font-semibold">Matos1911</span> nasceu da paixão por joalharia de luxo e do compromisso com a excelência artesanal. O que começou como uma pequena oficina familiar em Lisboa transformou-se numa das mais respeitadas ourivesarias de Portugal, mantendo sempre vivos os valores de qualidade, tradição e inovação.
              </p>
              
              <p>
                Ao longo de quase quatro décadas, temos cultivado relações estreitas com os mais talentosos artesãos e designers, garantindo que cada peça que oferecemos representa o mais alto padrão de qualidade e design. Especializamo-nos em joias feitas à mão com ouro, prata, platina e pedras preciosas selecionadas criteriosamente de fontes éticas.
              </p>
              
              <p>
                Na Matos1911, cada joia conta uma história e está imbuída não apenas de valor material, mas de significado emocional. Compreendemos que uma joia pode marcar momentos especiais - desde noivados e casamentos até aniversários e celebrações pessoais - e levamos esta responsabilidade muito a sério.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section id="valores" className="py-16 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-playfair font-bold text-darkGray mb-4">Nossa Missão</h3>
              <div className="w-16 h-1 bg-gold mb-6"></div>
              <p className="text-gray-600 mb-6">
                Criar joias excepcionais que transcendem gerações, combinando técnicas tradicionais com design contemporâneo, e proporcionar uma experiência de compra personalizada e memorável para cada cliente.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mt-1 mr-2 h-5 w-5" />
                  <span className="text-gray-600">Excelência artesanal em cada detalhe</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mt-1 mr-2 h-5 w-5" />
                  <span className="text-gray-600">Atendimento personalizado e exclusivo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mt-1 mr-2 h-5 w-5" />
                  <span className="text-gray-600">Materiais de altíssima qualidade</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-playfair font-bold text-darkGray mb-4">Nossa Visão</h3>
              <div className="w-16 h-1 bg-gold mb-6"></div>
              <p className="text-gray-600 mb-6">
                Ser reconhecida internacionalmente como sinónimo de requinte e excelência em joalharia, preservando o rico património artesanal português enquanto abraçamos a inovação e a sustentabilidade.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mt-1 mr-2 h-5 w-5" />
                  <span className="text-gray-600">Preservar técnicas artesanais tradicionais</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mt-1 mr-2 h-5 w-5" />
                  <span className="text-gray-600">Inovar com designs contemporâneos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-gold mt-1 mr-2 h-5 w-5" />
                  <span className="text-gray-600">Compromisso com práticas sustentáveis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline Section */}
      <section id="historia" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
              Nossa Jornada
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça os marcos importantes na história da OuroElegance ao longo dos anos.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="relative pl-8 sm:pl-32 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gold sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-4 after:h-4 after:bg-gold after:border-4 after:box-content after:border-cream after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute sm:left-0 sm:ml-[0.5rem] sm:translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">1985</time>
                  <div className="text-xl font-playfair font-bold text-darkGray">Fundação da Empresa</div>
                </div>
                <div className="text-gray-600">
                  Abertura da primeira loja na Baixa de Lisboa, especializada em anéis de noivado e alianças de casamento artesanais.
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gold sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-4 after:h-4 after:bg-gold after:border-4 after:box-content after:border-cream after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute sm:left-0 sm:ml-[0.5rem] sm:translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">1995</time>
                  <div className="text-xl font-playfair font-bold text-darkGray">Expansão</div>
                </div>
                <div className="text-gray-600">
                  Abertura da segunda loja na Avenida da Liberdade e inauguração do atelier de design próprio.
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gold sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-4 after:h-4 after:bg-gold after:border-4 after:box-content after:border-cream after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute sm:left-0 sm:ml-[0.5rem] sm:translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">2005</time>
                  <div className="text-xl font-playfair font-bold text-darkGray">Reconhecimento Internacional</div>
                </div>
                <div className="text-gray-600">
                  Participação em feiras internacionais de joalharia e início das exportações para toda a Europa.
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gold sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-4 after:h-4 after:bg-gold after:border-4 after:box-content after:border-cream after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute sm:left-0 sm:ml-[0.5rem] sm:translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">2015</time>
                  <div className="text-xl font-playfair font-bold text-darkGray">Inovação Digital</div>
                </div>
                <div className="text-gray-600">
                  Lançamento da plataforma de e-commerce e expansão para novos mercados internacionais.
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-gold sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-4 after:h-4 after:bg-gold after:border-4 after:box-content after:border-cream after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute sm:left-0 sm:ml-[0.5rem] sm:translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">Hoje</time>
                  <div className="text-xl font-playfair font-bold text-darkGray">Sustentabilidade</div>
                </div>
                <div className="text-gray-600">
                  Compromisso com práticas sustentáveis, incluindo a utilização de metais reciclados e diamantes éticos.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
              Nossa Equipa
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Artesãos talentosos e profissionais apaixonados que fazem da OuroElegance uma referência em joalharia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-darkGray/10">
                  <svg className="h-24 w-24 text-darkGray/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5.3 0-10 2.7-10 6v2h20v-2c0-3.3-4.7-6-10-6z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-darkGray mb-1">António Silva</h3>
                <p className="text-gold text-sm mb-3">Mestre Ourives, Fundador</p>
                <p className="text-gray-600">Com mais de 40 anos de experiência, António é o coração e a alma da nossa ourivesaria.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-darkGray/10">
                  <svg className="h-24 w-24 text-darkGray/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5.3 0-10 2.7-10 6v2h20v-2c0-3.3-4.7-6-10-6z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-darkGray mb-1">Maria Oliveira</h3>
                <p className="text-gold text-sm mb-3">Designer Chefe</p>
                <p className="text-gray-600">Formada pela Escola de Joalharia de Lisboa, Maria traz uma visão contemporânea às nossas criações.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200">
                <div className="w-full h-full flex items-center justify-center bg-darkGray/10">
                  <svg className="h-24 w-24 text-darkGray/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5.3 0-10 2.7-10 6v2h20v-2c0-3.3-4.7-6-10-6z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-darkGray mb-1">João Santos</h3>
                <p className="text-gold text-sm mb-3">Gemólogo Certificado</p>
                <p className="text-gray-600">Especialista em pedras preciosas, João garante que apenas as melhores gemas são utilizadas em nossas peças.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contacto">
              <Button className="bg-gold text-white hover:bg-opacity-90 transition-colors duration-300 font-medium btn-hover">
                Entre em Contacto
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterForm />
    </>
  );
};

export default AboutPage;
