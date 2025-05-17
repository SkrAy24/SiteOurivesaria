import React from "react";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  title,
  description,
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      {title && (
        <div className="text-center mb-16 mt-12">
          <h2 className="gucci-heading inline-block text-center text-2xl md:text-3xl">
            {title.toUpperCase()}
          </h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm font-light">{description}</p>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 font-light uppercase tracking-wider">Nenhum produto encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
