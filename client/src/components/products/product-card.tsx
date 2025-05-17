import React from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarHalf, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  hideBadges?: boolean;
  hideRating?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, hideBadges = false, hideRating = false }) => {
  const { addToCartMutation } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para adicionar produtos ao carrinho",
        variant: "destructive",
      });
      return;
    }

    addToCartMutation.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-black text-black" size={12} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-black text-black" size={12} />);
    }

    return stars;
  };

  return (
    <div className="product-card bg-white h-full flex flex-col transition-all duration-300">
      <div className="relative aspect-square overflow-hidden group">
        <img
          src={product.image || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!hideBadges && (
          <div className="absolute bottom-0 left-0 right-0">
            {product.isNew && (
              <div className="bg-black text-white text-xs px-4 py-2 uppercase tracking-wider font-light inline-block mr-1">
                Novo
              </div>
            )}
            {product.originalPrice && (
              <div className="bg-burgundy text-white text-xs px-4 py-2 uppercase tracking-wider font-light inline-block">
                Promoção
              </div>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20">
          <Link href={`/produtos/${product.slug}`}>
            <div className="bg-white text-black px-4 py-2 uppercase tracking-widest text-xs font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Ver Detalhes
            </div>
          </Link>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-futura uppercase tracking-wider text-black">
            {product.name}
          </h3>
          {!hideRating && product.rating && (
            <div className="flex text-black">
              {renderStars(parseFloat(product.rating.toString()))}
            </div>
          )}
        </div>
        <p className="text-gray-600 text-xs mb-4 line-clamp-2 font-light">{product.description}</p>
        <div className="mt-auto">
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="text-sm font-light text-black">
                €{parseFloat(product.price.toString()).toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-2">
                  €{parseFloat(product.originalPrice.toString()).toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="gucci-button w-full text-xs py-2"
            >
              ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
