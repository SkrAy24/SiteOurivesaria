import React, { ReactNode } from "react";
import { CartProvider as CartContextProvider } from "@/hooks/use-cart";

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
