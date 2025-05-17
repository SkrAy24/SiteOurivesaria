import React from "react";
import { Category } from "@shared/schema";
import CategoryCard from "./category-card";
import { Loader2 } from "lucide-react";

interface CategoryGridProps {
  categories: Category[];
  isLoading?: boolean;
  title?: string;
  description?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  isLoading = false,
  title,
  description,
}) => {
  return (
    <div>
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhuma categoria encontrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
