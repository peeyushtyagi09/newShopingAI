import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';
import { AuthModal } from './AuthModal';
import { PaymentModal } from './PaymentModal';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
  isAuthenticated: boolean;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onClose, isAuthenticated }: CartProps) {
  const [showAuth, setShowAuth] = React.useState(false);
  const [showPayment, setShowPayment] = React.useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
    } else {
      setShowPayment(true);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <>
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
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={() => {
        setShowAuth(false);
        setShowPayment(true);
      }} />}
      
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} total={total} />}
    </div>
  );
}