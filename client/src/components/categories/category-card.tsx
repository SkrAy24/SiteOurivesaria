import React from "react";
import { Link } from "wouter";
import { Category } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card className="category-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div 
        className="h-48 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <CardContent className="p-4 text-center">
        <h3 className="text-xl font-playfair font-semibold text-darkGray mb-2">
          {category.name}
        </h3>
        <Link href={`/categorias/${category.slug}`}>
          <a className="text-gold hover:underline text-sm font-medium">
            Explorar Coleção
          </a>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
