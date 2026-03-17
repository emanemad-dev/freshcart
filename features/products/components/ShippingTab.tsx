"use client";

import { FC } from 'react';
import { FaCheckCircle, FaShippingFast, FaUndo, FaShieldAlt } from 'react-icons/fa';

export const ShippingTab: FC = () => {
  return (
    <div className=\"space-y-8\">
      {/* Shipping + Returns */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
        {/* Shipping */}
        <div className=\"bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all\">
          <h3 className=\"flex items-center text-lg font-semibold text-gray-900 mb-5\">
            <span className=\"flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 mr-3\">
              <FaShippingFast className=\"text-emerald-600 w-4 h-4\" />
            </span>
            Shipping Information
          </h3>

          <ul className=\"space-y-3\">
            {[
              \"Free shipping on orders over $50\",
              \"Standard delivery: 3-5 business days\",
              \"Express delivery available (1-2 business days)\",
              \"Track your order in real-time\",
            ].map((item, i) => (
              <li
                key={i}
                className=\"flex items-start text-sm text-gray-600 gap-2\"
              >
                <FaCheckCircle className=\"text-emerald-500 mt-0.5 w-4 h-4 flex-shrink-0\" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Returns */}
        <div className=\"bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all\">
          <h3 className=\"flex items-center text-lg font-semibold text-gray-900 mb-5\">
            <span className=\"flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 mr-3\">
              <FaUndo className=\"text-emerald-600 w-4 h-4\" />
            </span>
            Returns & Refunds
          </h3>

          <ul className=\"space-y-3\">
            {[
              \"30-day hassle-free returns\",
              \"Full refund or exchange available\",
              \"Free return shipping on defective items\",
              \"Easy online return process\",
            ].map((item, i) => (
              <li
                key={i}
                className=\"flex items-start text-sm text-gray-600 gap-2\"
              >
                <FaCheckCircle className=\"text-emerald-500 mt-0.5 w-4 h-4 flex-shrink-0\" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buyer Protection */}
      <div className=\"bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl flex gap-4 items-start\">
        <div className=\"flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 flex-shrink-0\">
          <FaShieldAlt className=\"text-emerald-600 w-5 h-5\" />
        </div>

        <div>
          <h3 className=\"text-lg font-semibold text-gray-900 mb-1\">
            Buyer Protection Guarantee
          </h3>
          <p className=\"text-sm text-gray-600 leading-relaxed\">
            Get a full refund if your order doesn't arrive or isn't as
            described. We ensure your shopping experience is safe and
            secure.
          </p>
        </div>
      </div>
    </div>
  );
};
