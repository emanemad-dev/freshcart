"use client";

import {
  FaCreditCard,
  FaMoneyBillWave,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

interface PaymentMethodProps {
  paymentMethod: "cash" | "card";
  onChange: (method: "cash" | "card") => void;
}

export function PaymentMethod({ paymentMethod, onChange }: PaymentMethodProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white px-5 py-3">
        <h2 className="font-semibold flex items-center gap-2">
          <FaCreditCard />
          Payment Method
        </h2>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-4">
          Choose how you&apos;d like to pay
        </p>

        <div className="space-y-3">
          {/* Cash Payment Option */}
          <div
            onClick={() => onChange("cash")}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition 
    ${
      paymentMethod === "cash"
        ? "border-green-500 bg-green-50"
        : "border-gray-200 hover:border-green-300"
    }`}
          >
            <div className="flex items-center gap-4">
              <FaMoneyBillWave className="text-green-600 text-2xl" />
              <div>
                <p className="font-medium text-gray-800">Cash on Delivery</p>
                <p className="text-xs text-gray-500">
                  Pay when your order arrives at your doorstep
                </p>
              </div>
            </div>

            {paymentMethod === "cash" && (
              <FaCheckCircle className="text-green-500 text-2xl" />
            )}
          </div>

          {/* Card Payment Option */}
          <div
            onClick={() => onChange("card")}
            className={`flex flex-col p-4 rounded-xl border cursor-pointer transition 
    ${
      paymentMethod === "card"
        ? "border-green-500 bg-green-50"
        : "border-gray-200 hover:border-green-300"
    }`}
          >
            {/* Main Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FaCreditCard className="text-blue-600 text-2xl" />
                <div>
                  <p className="font-medium text-gray-800">Pay Online</p>
                  <p className="text-xs text-gray-500">
                    Secure payment with Credit/Debit Card via Stripe
                  </p>
                </div>
              </div>

              {/* Checkmark */}
              {paymentMethod === "card" && (
                <FaCheckCircle className="text-green-500 text-2xl" />
              )}
            </div>

            {/* Card Types */}
            {paymentMethod === "card" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700 font-medium">
                  Visa
                </span>
                <span className="px-3 py-1 text-xs rounded bg-red-100 text-red-700 font-medium">
                  Mastercard
                </span>
                <span className="px-3 py-1 text-xs rounded bg-green-100 text-green-700 font-medium">
                  Amex
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Secure Box */}
        <div className="mt-5 bg-green-50 text-green-700 text-sm p-3 rounded-lg flex items-center gap-2">
          <FaLock className="text-green-600" />
          Secure & Encrypted — Your payment info is protected with SSL
          encryption
        </div>
      </div>
    </div>
  );
}
