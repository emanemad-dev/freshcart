'use client';

import { FaCreditCard, FaMoneyBillWave, FaLock } from 'react-icons/fa';

interface PaymentMethodProps {
  paymentMethod: 'cash' | 'card';
  onChange: (method: 'cash' | 'card') => void;
}

export function PaymentMethod({ paymentMethod, onChange }: PaymentMethodProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaCreditCard className="text-green-600" />
        Payment Method
      </h2>
      <p className="text-gray-500 mb-6">Choose how you&apos;d like to pay</p>

      <div className="space-y-3">
        <label 
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            paymentMethod === 'cash' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={() => onChange('cash')}
            className="w-5 h-5 text-green-600"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-600" />
              <span className="font-semibold text-gray-800">Cash on Delivery</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Pay when your order arrives at your doorstep</p>
          </div>
        </label>

        <label 
          className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
            paymentMethod === 'card' 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => onChange('card')}
            className="w-5 h-5 text-green-600"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <FaCreditCard className="text-blue-600" />
              <span className="font-semibold text-gray-800">Pay Online</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Secure payment with Credit/Debit Card via Stripe</p>
          </div>
        </label>

        {paymentMethod === 'card' && (
          <div className="ml-14 flex items-center gap-2 mt-2">
            <div className="px-3 py-1 bg-blue-100 rounded text-blue-700 text-sm font-medium">Visa</div>
            <div className="px-3 py-1 bg-red-100 rounded text-red-700 text-sm font-medium">Mastercard</div>
            <div className="px-3 py-1 bg-green-100 rounded text-green-700 text-sm font-medium">Amex</div>
            <span className="text-xs text-gray-500 ml-2 flex items-center gap-1">
              <FaLock className="w-3 h-3" />
              Secure &amp; Encrypted
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

