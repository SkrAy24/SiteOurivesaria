import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Loader2, LogIn, UserPlus } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Nome de usuário deve ter pelo menos 3 caracteres",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres",
  }),
});

// Register form schema
const registerSchema = z.object({
  username: z.string().min(3, {
    message: "Nome de usuário deve ter pelo menos 3 caracteres",
  }),
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });
  
  // Submit login form
  function onLoginSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }
  
  // Submit register form
  function onRegisterSubmit(values: RegisterFormValues) {
    registerMutation.mutate(values);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream py-12 px-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Hero Section / Left Side */}
        <div className="md:w-1/2 bg-darkGray text-white p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Bem-vindo à Matos1911
          </h1>
          <p className="mb-6 text-gray-300">
            Descubra a nossa exclusiva coleção de joias e relógios de luxo. Entre na sua conta para uma experiência personalizada.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-gold rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gold">Acesso exclusivo</h3>
                <p className="text-sm text-gray-300">Acesso a produtos exclusivos e lançamentos</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gold rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gold">Histórico de compras</h3>
                <p className="text-sm text-gray-300">Acompanhe todas as suas compras facilmente</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gold rounded-full p-1 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gold">Checkout simplificado</h3>
                <p className="text-sm text-gray-300">Finalização rápida de compras sem reentrada de dados</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Section / Right Side */}
        <div className="md:w-1/2 p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-darkGray">
                    Entre na sua conta
                  </CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para acessar sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome de Usuário</FormLabel>
                            <FormControl>
                              <Input placeholder="seu_usuario" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gold text-white hover:bg-opacity-90"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <LogIn className="mr-2 h-4 w-4" />
                        )}
                        Entrar
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                      Não tem uma conta?{" "}
                      <a
                        className="text-gold hover:underline cursor-pointer"
                        onClick={() => setActiveTab("register")}
                      >
                        Registe-se aqui
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-darkGray">
                    Crie sua conta
                  </CardTitle>
                  <CardDescription>
                    Registre-se para acessar recursos exclusivos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome de Usuário</FormLabel>
                            <FormControl>
                              <Input placeholder="seu_usuario" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu Nome Completo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gold text-white hover:bg-opacity-90"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <UserPlus className="mr-2 h-4 w-4" />
                        )}
                        Registrar
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                      Já tem uma conta?{" "}
                      <a
                        className="text-gold hover:underline cursor-pointer"
                        onClick={() => setActiveTab("login")}
                      >
                        Entre aqui
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <Link href="/">
              <a className="text-gold hover:underline text-sm">
                Voltar para a página inicial
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
