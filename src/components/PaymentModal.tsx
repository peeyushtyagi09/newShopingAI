import React, { useState } from 'react';
import { X, CreditCard, Wallet } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  total: number;
}

export function PaymentModal({ onClose, total }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle payment processing
    alert('Payment successful!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Payment</h2>

        <div className="mb-6">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
              paymentMethod === 'card'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Card
          </button>
          <button
            onClick={() => setPaymentMethod('wallet')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
              paymentMethod === 'wallet'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Wallet className="w-5 h-5" />
            Digital Wallet
          </button>
        </div>

        {paymentMethod === 'card' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVC</label>
                <input
                  type="text"
                  value={cardData.cvc}
                  onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Pay ${total.toFixed(2)}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Select Digital Wallet</h3>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-white rounded-md border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                  PayPal
                </button>
                <button className="w-full py-2 px-4 bg-white rounded-md border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Google_Pay_Logo.svg" alt="Google Pay" className="h-6" />
                  Google Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}