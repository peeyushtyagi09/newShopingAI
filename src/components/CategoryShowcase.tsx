import React from 'react';
import { ShoppingBag, Shirt, Watch, Diamond, Package } from 'lucide-react';

interface CategoryShowcaseProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'electronics':
      return <Package className="w-8 h-8" />;
    case "men's clothing":
      return <Shirt className="w-8 h-8" />;
    case "women's clothing":
      return <ShoppingBag className="w-8 h-8" />;
    case 'jewelery':
      return <Diamond className="w-8 h-8" />;
    default:
      return <Watch className="w-8 h-8" />;
  }
};

export function CategoryShowcase({ categories, onSelectCategory }: CategoryShowcaseProps) {
  const filteredCategories = categories.filter(cat => cat !== 'all');
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {filteredCategories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3"
        >
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            {getCategoryIcon(category)}
          </div>
          <span className="text-gray-700 font-medium text-center">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </button>
      ))}
    </div>
  );
}