import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CartItem as CartItemType, Product } from "@shared/schema";
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
import { 
  Loader2, 
  CreditCard, 
  CheckCircle2, 
  ShoppingCart, 
  AlertTriangle,
  Home,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  shippingAddress: z.string().min(10, {
    message: "O endereço de entrega deve ter pelo menos 10 caracteres",
  }),
});

const CheckoutPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shippingAddress: user?.address || "",
    },
  });
  
  // Fetch cart items with product details
  const {
    data: cartItems,
    isLoading: isCartLoading,
  } = useQuery<(CartItemType & { product: Product })[]>({
    queryKey: ["/api/cart"],
    enabled: !!user && !orderCompleted,
  });
  
  // Calculate cart totals
  const cartTotal = cartItems?.reduce((sum, item) => {
    const price = parseFloat(item.product.price.toString());
    return sum + (price * item.quantity);
  }, 0) || 0;
  
  const orderMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await apiRequest("POST", "/api/orders", values);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      setOrderCompleted(true);
      setOrderId(data.id);
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Obrigado pela sua compra.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao finalizar o pedido",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    orderMutation.mutate(values);
  }
  
  const handleGoToAccount = () => {
    setLocation("/conta");
  };
  
  const handleBackToShopping = () => {
    setLocation("/produtos");
  };

  if (orderCompleted) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
          <div className="bg-cream rounded-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle2 className="h-16 w-16 text-gold mx-auto" />
            </div>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-darkGray mb-4">
              Pedido Finalizado com Sucesso!
            </h2>
            <p className="text-gray-600 mb-2">
              Obrigado pela sua compra. Seu pedido #{orderId} foi confirmado.
            </p>
            <p className="text-gray-600 mb-8">
              Você receberá um e-mail com os detalhes do seu pedido em breve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gold text-white hover:bg-opacity-90"
                onClick={handleGoToAccount}
              >
                Ver Meus Pedidos
              </Button>
              <Button 
                variant="outline" 
                className="border-gold text-gold hover:bg-gold hover:text-white"
                onClick={handleBackToShopping}
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            <Link href="/carrinho">
              <a className="hover:text-gold transition-colors">Carrinho</a>
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gold font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-8 text-center">
            Finalizar Compra
          </h1>

          {isCartLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : !cartItems || cartItems.length === 0 ? (
            <div className="text-center py-8 max-w-lg mx-auto">
              <div className="bg-cream rounded-lg p-8 mb-6">
                <AlertTriangle className="h-12 w-12 text-gold mx-auto mb-4" />
                <h2 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                  Seu carrinho está vazio
                </h2>
                <p className="text-gray-600 mb-6">
                  Adicione produtos ao carrinho antes de finalizar a compra.
                </p>
                <Link href="/produtos">
                  <Button className="bg-gold text-white hover:bg-opacity-90 w-full">
                    Ver Produtos
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <div>
                <div className="bg-cream rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-playfair font-semibold text-darkGray mb-6">
                    Informações de Envio
                  </h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="shippingAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço de Entrega</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Digite seu endereço completo"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gold text-white hover:bg-opacity-90 transition-colors duration-300 btn-hover"
                        disabled={orderMutation.isPending}
                      >
                        {orderMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processando...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Finalizar Pedido
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>

                <div className="bg-cream rounded-lg p-6">
                  <h3 className="text-lg font-playfair font-semibold text-darkGray mb-4">
                    Métodos de Pagamento
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Pagamento seguro processado ao finalizar o pedido. Aceitamos:
                  </p>
                  <div className="flex space-x-3">
                    <div className="bg-white p-2 rounded">
                      <svg className="h-8 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 12H4C2.89543 12 2 12.8954 2 14V34C2 35.1046 2.89543 36 4 36H44C45.1046 36 46 35.1046 46 34V14C46 12.8954 45.1046 12 44 12Z" fill="#E6E6E6"/>
                        <path d="M4 12H44C45.1046 12 46 12.8954 46 14V18H2V14C2 12.8954 2.89543 12 4 12Z" fill="#5286F9"/>
                        <path d="M4 36H44C45.1046 36 46 35.1046 46 34V30H2V34C2 35.1046 2.89543 36 4 36Z" fill="#5286F9"/>
                        <path d="M17 23H12C11.4477 23 11 23.4477 11 24V27C11 27.5523 11.4477 28 12 28H17C17.5523 28 18 27.5523 18 27V24C18 23.4477 17.5523 23 17 23Z" fill="#FFB74D"/>
                      </svg>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <svg className="h-8 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 12H4C2.89543 12 2 12.8954 2 14V34C2 35.1046 2.89543 36 4 36H44C45.1046 36 46 35.1046 46 34V14C46 12.8954 45.1046 12 44 12Z" fill="#ECEFF1"/>
                        <path d="M26 28H22V30H26V28Z" fill="#F44336"/>
                        <path d="M28 24H26V30H28V24Z" fill="#FF9800"/>
                        <path d="M22 24H20V30H22V24Z" fill="#2196F3"/>
                        <path d="M24 20H22V30H24V20Z" fill="#FFC107"/>
                      </svg>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <svg className="h-8 w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 12H4C2.89543 12 2 12.8954 2 14V34C2 35.1046 2.89543 36 4 36H44C45.1046 36 46 35.1046 46 34V14C46 12.8954 45.1046 12 44 12Z" fill="#1976D2"/>
                        <circle cx="16" cy="24" r="8" fill="#FFC107"/>
                        <circle cx="32" cy="24" r="8" fill="#FF5722" fillOpacity="0.8"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-cream rounded-lg p-6">
                <h2 className="text-xl font-playfair font-semibold text-darkGray mb-6">
                  Resumo do Pedido
                </h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-darkGray mb-3 flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Itens no Carrinho ({cartItems.length})</span>
                  </h3>
                  
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start border-b pb-4">
                        <div className="w-16 h-16 min-w-16 overflow-hidden rounded bg-white mr-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-darkGray text-sm truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Quantidade: {item.quantity}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm font-medium text-darkGray">
                              €{parseFloat(item.product.price.toString()).toFixed(2).replace(".", ",")}
                            </span>
                            <span className="text-sm font-medium text-darkGray">
                              €{(parseFloat(item.product.price.toString()) * item.quantity).toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-darkGray">
                      €{cartTotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium text-darkGray">Grátis</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-darkGray">Total</span>
                    <span className="font-semibold text-darkGray text-xl">
                      €{cartTotal.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    <CheckCircle2 className="inline-block text-gold mr-2 h-4 w-4" />
                    Garantia vitalícia em todos os produtos
                  </p>
                  <p className="text-sm text-gray-600">
                    <CheckCircle2 className="inline-block text-gold mr-2 h-4 w-4" />
                    30 dias para devolução ou troca
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
