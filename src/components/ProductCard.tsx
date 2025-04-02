import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
          } hover:scale-110 transition-transform`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{product.title}</h3>
        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        <p className="mt-2 text-xl font-bold text-gray-900">${product.price}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}