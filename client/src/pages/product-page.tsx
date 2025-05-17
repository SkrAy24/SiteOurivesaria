import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, Star, StarHalf, Home, ChevronRight } from "lucide-react";
import ProductGrid from "@/components/products/product-grid";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const ProductPage: React.FC = () => {
  const [match, params] = useRoute("/produtos/:slug");
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { user } = useAuth();
  const { addToCartMutation } = useCart();

  const {
    data: product,
    isLoading,
    error
  } = useQuery<Product>({
    queryKey: [`/api/products/${params?.slug}`],
    enabled: !!params?.slug
  });

  const {
    data: similarProducts,
    isLoading: isSimilarLoading
  } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!product,
    select: (data) => {
      if (!product) return [];
      return data
        .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
        .slice(0, 3);
    }
  });

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para adicionar produtos ao carrinho",
        variant: "destructive",
      });
      return;
    }

    if (product) {
      addToCartMutation.mutate({
        productId: product.id,
        quantity
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-gold text-gold" size={18} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-gold text-gold" size={18} />);
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-playfair font-bold text-darkGray mb-4">
          Produto não encontrado
        </h2>
        <p className="text-gray-600 mb-8">
          O produto que você está procurando não está disponível ou não existe.
        </p>
        <Link href="/produtos">
          <Button className="bg-gold text-white hover:bg-opacity-90">
            Ver todos os produtos
          </Button>
        </Link>
      </div>
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
            <Link href="/produtos">
              <a className="hover:text-gold transition-colors">Produtos</a>
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gold font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-cream rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain min-h-[400px]"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-gold mr-2">
                  {renderStars(parseFloat(product.rating.toString()))}
                </div>
                <span className="text-gray-500 text-sm">
                  ({parseFloat(product.rating.toString()).toFixed(1)}) 
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-semibold text-darkGray">
                    €{parseFloat(product.price.toString()).toFixed(2).replace(".", ",")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">
                      €{parseFloat(product.originalPrice.toString()).toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                
                {product.originalPrice && (
                  <span className="inline-block bg-accentRed text-white text-xs px-2 py-1 rounded-md">
                    {Math.round((1 - parseFloat(product.price.toString()) / parseFloat(product.originalPrice.toString())) * 100)}% off
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-8">
                {product.description}
              </p>

              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6">
                  <span className="font-medium text-darkGray">Quantidade:</span>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-l-md border-r-0"
                      onClick={decrementQuantity}
                    >
                      -
                    </Button>
                    <div className="h-10 w-16 flex items-center justify-center border border-input">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-r-md border-l-0"
                      onClick={incrementQuantity}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    className="bg-gold text-white hover:bg-opacity-90 transition-colors duration-300 btn-hover flex-1"
                    onClick={handleAddToCart}
                    disabled={addToCartMutation.isPending}
                  >
                    {addToCartMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="mr-2 h-4 w-4" />
                    )}
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Frete grátis para todo o país</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-600">Garantia vitalícia</span>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                  </svg>
                  <span className="text-gray-600">30 dias para devolução</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts && similarProducts.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <ProductGrid
              products={similarProducts}
              isLoading={isSimilarLoading}
              title="Produtos Relacionados"
              description="Você também pode gostar destes produtos"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default ProductPage;
