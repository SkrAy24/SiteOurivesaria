import { createContext, ReactNode, useContext, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { CartItem, Product } from "@shared/schema";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

type CartItemWithProduct = CartItem & { product: Product };

interface AddToCartData {
  productId: number;
  quantity: number;
}

interface UpdateCartData {
  id: number;
  quantity: number;
}

type CartContextType = {
  cartItems: CartItemWithProduct[];
  isLoading: boolean;
  error: Error | null;
  addToCartMutation: UseMutationResult<CartItemWithProduct, Error, AddToCartData>;
  updateCartMutation: UseMutationResult<CartItemWithProduct, Error, UpdateCartData>;
  removeFromCartMutation: UseMutationResult<void, Error, number>;
  clearCartMutation: UseMutationResult<void, Error, void>;
  totalItems: number;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const {
    data: cartItems,
    error,
    isLoading,
    refetch
  } = useQuery<CartItemWithProduct[], Error>({
    queryKey: ["/api/cart"],
    enabled: !!user,
  });

  // Refetch cart whenever user changes
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const addToCartMutation = useMutation({
    mutationFn: async (data: AddToCartData) => {
      const res = await apiRequest("POST", "/api/cart", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Adicionado ao carrinho",
        description: "O produto foi adicionado ao seu carrinho com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao adicionar ao carrinho",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: async (data: UpdateCartData) => {
      const res = await apiRequest("PUT", `/api/cart/${data.id}`, { quantity: data.quantity });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Carrinho atualizado",
        description: "A quantidade foi atualizada com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar o carrinho",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removido",
        description: "O item foi removido do seu carrinho com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao remover item",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Carrinho limpo",
        description: "Todos os itens foram removidos do seu carrinho.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao limpar o carrinho",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  
  const totalPrice = cartItems?.reduce((acc, item) => {
    const price = parseFloat(item.product.price.toString());
    return acc + (price * item.quantity);
  }, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems || [],
        isLoading,
        error,
        addToCartMutation,
        updateCartMutation,
        removeFromCartMutation,
        clearCartMutation,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
