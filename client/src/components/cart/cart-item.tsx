import React from "react";
import { CartItem as CartItemType, Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Link } from "wouter";

interface CartItemProps {
  item: CartItemType & { product: Product };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartMutation, removeFromCartMutation } = useCart();
  
  const handleIncreaseQuantity = () => {
    updateCartMutation.mutate({
      id: item.id,
      quantity: item.quantity + 1,
    });
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateCartMutation.mutate({
        id: item.id,
        quantity: item.quantity - 1,
      });
    } else {
      handleRemove();
    }
  };
  
  const handleRemove = () => {
    removeFromCartMutation.mutate(item.id);
  };
  
  // Calculate item total
  const price = parseFloat(item.product.price.toString());
  const total = price * item.quantity;

  return (
    <tr className="border-b">
      <td className="py-4 px-2 md:px-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="w-16 h-16 min-w-16 overflow-hidden rounded">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Link href={`/produtos/${item.product.slug}`}>
              <a className="font-playfair font-medium text-darkGray hover:text-gold transition-colors">
                {item.product.name}
              </a>
            </Link>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 md:px-4 text-center">
        €{price.toFixed(2).replace(".", ",")}
      </td>
      <td className="py-4 px-2 md:px-4">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleDecreaseQuantity}
            disabled={updateCartMutation.isPending}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Diminuir</span>
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleIncreaseQuantity}
            disabled={updateCartMutation.isPending}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Aumentar</span>
          </Button>
        </div>
      </td>
      <td className="py-4 px-2 md:px-4 text-center font-semibold">
        €{total.toFixed(2).replace(".", ",")}
      </td>
      <td className="py-4 px-2 md:px-4 text-center">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50"
          onClick={handleRemove}
          disabled={removeFromCartMutation.isPending}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Remover</span>
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
