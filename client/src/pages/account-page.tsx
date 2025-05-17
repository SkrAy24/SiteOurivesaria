import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Loader2, User, Package, Settings, ClipboardList, Home, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Profile update form schema
const profileSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

interface OrderItemWithProduct {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string | number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
}

interface OrderWithItems extends Order {
  items: OrderItemWithProduct[];
}

const AccountPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Fetch user orders
  const {
    data: orders,
    isLoading: isOrdersLoading,
  } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/orders"],
    enabled: !!user,
  });
  
  // Set up form with user data
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });
  
  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (values: z.infer<typeof profileSchema>) => {
      const res = await apiRequest("PUT", `/api/user/${user?.id}`, values);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao atualizar o perfil. Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: z.infer<typeof profileSchema>) {
    updateProfileMutation.mutate(values);
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT');
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Translate status
  const translateStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em processamento';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

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
            <span className="text-gold font-medium">Minha Conta</span>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-8 text-center">
            Minha Conta
          </h1>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile" className="font-medium">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="orders" className="font-medium">
                  <Package className="mr-2 h-4 w-4" />
                  Pedidos
                </TabsTrigger>
                <TabsTrigger value="settings" className="font-medium">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-playfair font-semibold text-darkGray mb-6">
                      Informações Pessoais
                    </h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome Completo</FormLabel>
                                <FormControl>
                                  <Input {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Endereço</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  placeholder="Seu endereço completo"
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="bg-gold text-white hover:bg-opacity-90"
                          disabled={updateProfileMutation.isPending}
                        >
                          {updateProfileMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Salvando...
                            </>
                          ) : (
                            "Salvar Alterações"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-playfair font-semibold text-darkGray mb-6">
                      Histórico de Pedidos
                    </h2>
                    
                    {isOrdersLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-gold" />
                      </div>
                    ) : !orders || orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ClipboardList className="h-12 w-12 text-gold mx-auto mb-4" />
                        <h3 className="font-medium text-darkGray mb-2">Nenhum pedido encontrado</h3>
                        <p className="text-gray-600 mb-6">
                          Você ainda não realizou nenhuma compra.
                        </p>
                        <Link href="/produtos">
                          <Button className="bg-gold text-white hover:bg-opacity-90">
                            Começar a comprar
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-darkGray">Pedido #{order.id}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                    {translateStatus(order.status)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  Data: {formatDate(order.createdAt)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-darkGray">
                                  Total: €{parseFloat(order.total.toString()).toFixed(2).replace(".", ",")}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Itens: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <h4 className="font-medium text-darkGray mb-3">Produtos:</h4>
                              <div className="space-y-3">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                      <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <Link href={`/produtos/${item.product.slug}`}>
                                        <a className="font-medium text-darkGray hover:text-gold transition-colors">
                                          {item.product.name}
                                        </a>
                                      </Link>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">
                                          Qtd: {item.quantity} × €
                                          {parseFloat(item.price.toString()).toFixed(2).replace(".", ",")}
                                        </span>
                                        <span className="font-medium text-darkGray">
                                          €
                                          {(parseFloat(item.price.toString()) * item.quantity)
                                            .toFixed(2)
                                            .replace(".", ",")}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-4 pt-4 border-t">
                                <h4 className="font-medium text-darkGray mb-2">Endereço de Entrega:</h4>
                                <p className="text-gray-600">{order.shippingAddress}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-playfair font-semibold text-darkGray mb-6">
                      Configurações da Conta
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-darkGray mb-2">Alterar Senha</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Para alterar sua senha, preencha os campos abaixo.
                        </p>
                        
                        <form className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Senha Atual
                              </label>
                              <Input type="password" placeholder="••••••••" />
                            </div>
                            <div></div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nova Senha
                              </label>
                              <Input type="password" placeholder="••••••••" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Nova Senha
                              </label>
                              <Input type="password" placeholder="••••••••" />
                            </div>
                          </div>
                          
                          <Button 
                            className="bg-gold text-white hover:bg-opacity-90 mt-2"
                            disabled
                          >
                            Alterar Senha
                          </Button>
                        </form>
                      </div>
                      
                      <div className="pt-6 border-t">
                        <h3 className="font-medium text-darkGray mb-2">Notificações</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Gerencie suas preferências de notificações.
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-darkGray">Notificações de Email</span>
                              <p className="text-xs text-gray-500">Receba emails sobre novos produtos e promoções</p>
                            </div>
                            <div>
                              <input type="checkbox" id="emailNotifications" className="rounded text-gold focus:ring-gold" />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-darkGray">Atualizações de Pedidos</span>
                              <p className="text-xs text-gray-500">Receba atualizações sobre o status dos seus pedidos</p>
                            </div>
                            <div>
                              <input type="checkbox" id="orderUpdates" className="rounded text-gold focus:ring-gold" checked readOnly />
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-darkGray">Newsletter</span>
                              <p className="text-xs text-gray-500">Receba nossas newsletters mensais</p>
                            </div>
                            <div>
                              <input type="checkbox" id="newsletter" className="rounded text-gold focus:ring-gold" />
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-gold text-white hover:bg-opacity-90 mt-4"
                          disabled
                        >
                          Salvar Preferências
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
