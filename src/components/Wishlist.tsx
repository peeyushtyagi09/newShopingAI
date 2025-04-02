import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface WishlistProps {
  items: Product[];
  onClose: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function Wishlist({ items, onClose, onRemoveFromWishlist, onAddToCart }: WishlistProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Wishlist</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <h3 className="font-medium line-clamp-1">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item)}
                    className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-md hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}