import React, { useEffect, useState } from 'react';
import { Product, CartItem, AuthState } from './types';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { HomeSlider } from './components/HomeSlider';
import { CategoryShowcase } from './components/CategoryShowcase';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        
        const uniqueCategories = ['all', ...new Set(data.map((p: Product) => p.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const filteredProducts = products.filter(
    product => selectedCategory === 'all' || product.category === selectedCategory
  );

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleVoiceAddToCart = (productName: string) => {
    const product = products.find(p => 
      p.title.toLowerCase().includes(productName.toLowerCase())
    );
    if (product) {
      addToCart(product);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HomeSlider onCategorySelect={setSelectedCategory} />
          <CategoryShowcase categories={categories} onSelectCategory={setSelectedCategory} />

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2 mt-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={wishlist.some(item => item.id === product.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <VoiceAssistant onAddToCart={handleVoiceAddToCart} />

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <Cart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onClose={() => setIsCartOpen(false)}
            isAuthenticated={auth.isAuthenticated}
          />
        </div>
      )}

      {isWishlistOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <Wishlist
            items={wishlist}
            onClose={() => setIsWishlistOpen(false)}
            onRemoveFromWishlist={toggleWishlist}
            onAddToCart={addToCart}
          />
        </div>
      )}
    </div>
  );
}

export default App;