import React from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { CartItem as CartItemType, Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, ShoppingCart, ArrowRight, Home, ChevronRight, Trash2 } from "lucide-react";
import CartItem from "@/components/cart/cart-item";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";

const CartPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { clearCartMutation } = useCart();
  
  // Fetch cart items with product details
  const {
    data: cartItems,
    isLoading,
    error
  } = useQuery<(CartItemType & { product: Product })[]>({
    queryKey: ["/api/cart"],
    enabled: !!user
  });
  
  // Calculate cart totals
  const cartTotal = cartItems?.reduce((sum, item) => {
    const price = parseFloat(item.product.price.toString());
    return sum + (price * item.quantity);
  }, 0) || 0;
  
  const handleClearCart = () => {
    if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
      clearCartMutation.mutate();
    }
  };
  
  const handleProceedToCheckout = () => {
    setLocation("/checkout");
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
            <span className="text-gold font-medium">Carrinho</span>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-8 text-center">
            Seu Carrinho
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : !user ? (
            <div className="text-center py-8 max-w-lg mx-auto">
              <div className="bg-cream rounded-lg p-8 mb-6">
                <AlertTriangle className="h-12 w-12 text-gold mx-auto mb-4" />
                <h2 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                  Login necessário
                </h2>
                <p className="text-gray-600 mb-6">
                  Por favor, faça login para visualizar o seu carrinho de compras.
                </p>
                <Link href="/auth">
                  <Button className="bg-gold text-white hover:bg-opacity-90 w-full">
                    Fazer Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : !cartItems || cartItems.length === 0 ? (
            <div className="text-center py-8 max-w-lg mx-auto">
              <div className="bg-cream rounded-lg p-8 mb-6">
                <ShoppingCart className="h-12 w-12 text-gold mx-auto mb-4" />
                <h2 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                  Seu carrinho está vazio
                </h2>
                <p className="text-gray-600 mb-6">
                  Adicione produtos incríveis para continuar suas compras.
                </p>
                <Link href="/produtos">
                  <Button className="bg-gold text-white hover:bg-opacity-90 w-full">
                    Ver Produtos
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto mb-8">
                <table className="w-full min-w-[800px]">
                  <thead className="border-b">
                    <tr>
                      <th className="py-4 px-2 md:px-4 text-left font-medium text-darkGray">Produto</th>
                      <th className="py-4 px-2 md:px-4 text-center font-medium text-darkGray">Preço</th>
                      <th className="py-4 px-2 md:px-4 text-center font-medium text-darkGray">Quantidade</th>
                      <th className="py-4 px-2 md:px-4 text-center font-medium text-darkGray">Total</th>
                      <th className="py-4 px-2 md:px-4 text-center font-medium text-darkGray"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-12 mb-8">
                <div className="md:flex-1">
                  <Button
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-white"
                    onClick={handleClearCart}
                    disabled={clearCartMutation.isPending}
                  >
                    {clearCartMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Esvaziar Carrinho
                  </Button>
                </div>
                
                <div className="md:w-96 bg-cream p-6 rounded-lg">
                  <h3 className="text-xl font-playfair font-semibold text-darkGray mb-4">
                    Resumo do Pedido
                  </h3>
                  
                  <div className="space-y-3 mb-6">
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
                  
                  <Button
                    className="w-full bg-gold text-white hover:bg-opacity-90 transition-colors duration-300 btn-hover"
                    onClick={handleProceedToCheckout}
                  >
                    Finalizar Compra
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default CartPage;
