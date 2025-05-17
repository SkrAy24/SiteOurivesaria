import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscrição realizada com sucesso!",
        description: "Obrigado por subscrever a nossa newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 bg-darkGray text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            Receba Novidades e Ofertas Exclusivas
          </h2>
          <p className="mb-6 text-gray-300">
            Subscreva a nossa newsletter para se manter atualizado sobre novos produtos, promoções especiais e eventos.
          </p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Seu email"
              className="flex-grow px-4 py-3 rounded-md text-darkGray"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-gold text-white hover:bg-opacity-90 transition-colors duration-300 font-medium whitespace-nowrap"
              disabled={isSubmitting}
            >
              {isSubmitting ? "A subscrever..." : "Subscrever"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            Ao subscrever, concorda com a nossa política de privacidade. Não enviamos spam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
