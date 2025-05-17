import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Category, Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Grid3X3, LayoutList, Search, Home, ChevronRight, Star, StarHalf } from "lucide-react";
import ProductGrid from "@/components/products/product-grid";
import CategoryGrid from "@/components/categories/category-grid";

interface CategoryPageProps {
  isAllProducts?: boolean;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ isAllProducts = false }) => {
  const [match, params] = useRoute("/categorias/:slug");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");

  // Fetch all categories
  const {
    data: categories,
    isLoading: isCategoriesLoading
  } = useQuery<Category[]>({
    queryKey: ["/api/categories"]
  });

  // Fetch category by slug
  const {
    data: category,
    isLoading: isCategoryLoading
  } = useQuery<Category>({
    queryKey: [`/api/categories/${params?.slug}`],
    enabled: !isAllProducts && !!params?.slug
  });

  // Fetch products
  const {
    data: allProducts,
    isLoading: isProductsLoading
  } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  // Filter and sort products
  const products = React.useMemo(() => {
    if (!allProducts) return [];
    
    let filtered = [...allProducts];
    
    // Filter by category if we're on a category page
    if (!isAllProducts && category) {
      filtered = filtered.filter(product => product.categoryId === category.id);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    // Sort products
    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => 
        parseFloat(a.price.toString()) - parseFloat(b.price.toString())
      );
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => 
        parseFloat(b.price.toString()) - parseFloat(a.price.toString())
      );
    } else if (sortOrder === "newest") {
      filtered.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOrder === "rating") {
      filtered.sort((a, b) => 
        parseFloat(b.rating.toString()) - parseFloat(a.rating.toString())
      );
    }
    
    return filtered;
  }, [allProducts, category, isAllProducts, searchQuery, sortOrder]);

  const isLoading = isAllProducts 
    ? isProductsLoading || isCategoriesLoading
    : isProductsLoading || isCategoryLoading;

  const pageTitle = isAllProducts 
    ? "Todos os Produtos" 
    : category?.name || "Categoria";

  const pageDescription = isAllProducts
    ? "Explore nossa coleção completa de joias e relógios de luxo."
    : category?.description || "Produtos nesta categoria";

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
            {isAllProducts ? (
              <span className="text-gold font-medium">Produtos</span>
            ) : (
              <>
                <Link href="/categorias">
                  <a className="hover:text-gold transition-colors">Categorias</a>
                </Link>
                {category && (
                  <>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-gold font-medium">{category.name}</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-darkGray mb-4">
              {pageTitle}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </div>

          {/* Categories Grid (show only on the categories landing page) */}
          {!isAllProducts && !params?.slug && categories && categories.length > 0 && (
            <div className="mb-16">
              <CategoryGrid 
                categories={categories}
                isLoading={isCategoriesLoading}
              />
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Em Destaque</SelectItem>
                  <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                  <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
                  <SelectItem value="newest">Mais Recentes</SelectItem>
                  <SelectItem value="rating">Melhor Avaliados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-playfair font-semibold text-darkGray mb-3">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Não encontramos produtos correspondentes à sua pesquisa.
              </p>
              <Button
                className="bg-gold text-white hover:bg-opacity-90"
                onClick={() => setSearchQuery("")}
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="product-card bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-64 bg-cover bg-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.isNew && (
                      <div className="absolute top-3 right-3 bg-accentRed text-white text-xs px-2 py-1 rounded-md">
                        Novo
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-gold text-white text-xs px-2 py-1 rounded-md">
                        Promoção
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-playfair font-semibold text-darkGray">
                        {product.name}
                      </h3>
                      <div className="text-gold flex">
                        {Array(Math.floor(parseFloat(product.rating.toString())))
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="fill-gold text-gold" size={16} />
                          ))}
                        {parseFloat(product.rating.toString()) % 1 >= 0.5 && (
                          <StarHalf className="fill-gold text-gold" size={16} />
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold text-darkGray">
                          €{parseFloat(product.price.toString()).toFixed(2).replace(".", ",")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            €{parseFloat(product.originalPrice.toString()).toFixed(2).replace(".", ",")}
                          </span>
                        )}
                      </div>
                      <Link href={`/produtos/${product.slug}`}>
                        <Button 
                          className="bg-gold text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-300 text-sm font-medium btn-hover"
                          size="sm"
                        >
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
