import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(3, { message: "Assunto deve ter pelo menos 3 caracteres" }),
  message: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const res = await apiRequest("POST", "/api/contact", values);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: ContactFormValues) {
    contactMutation.mutate(values);
  }

  return (
    <form
      className="bg-cream p-8 rounded-lg shadow-md"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h3 className="text-2xl font-playfair font-semibold text-darkGray mb-6 text-center">
        Envie-nos uma Mensagem
      </h3>

      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-darkGray font-medium">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-darkGray font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Seu email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-darkGray font-medium">Assunto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Assunto da mensagem"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-darkGray font-medium">Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Sua mensagem"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gold text-white py-3 rounded-md hover:bg-opacity-90 transition-colors duration-300 font-medium mt-2"
            disabled={contactMutation.isPending}
          >
            {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </div>
      </Form>
    </form>
  );
};

export default ContactForm;
