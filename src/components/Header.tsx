import React from 'react';
import { ShoppingCart as CartIcon, Heart, Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
}

export function Header({ cartItemsCount, wishlistCount, onCartClick, onWishlistClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="bg-gray-900 text-white py-2 px-4">
          <div className="flex justify-between items-center text-sm">
            <div>Free shipping on orders over $50</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300">Track Order</a>
              <a href="#" className="hover:text-gray-300">Help</a>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">ShopHub</h1>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </button>
            <button
              onClick={onWishlistClick}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <CartIcon className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block px-4 py-2 border-t">
          <ul className="flex gap-6">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">New Arrivals</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Women</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Men</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Accessories</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Sale</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}