"use client";

import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';


interface ProductDetailsTabProps {
  product: Product;
}

export const ProductDetailsTab: FC<ProductDetailsTabProps> = ({ product }) => {
  return (
    <div className=\"space-y-8\">
      <div>
        <h2 className=\"text-xl font-semibold text-gray-900 mb-3\">
          About this Product
        </h2>

        <p className=\"text-sm text-gray-600 leading-relaxed\">
          Material Polyester Blend • Colour Name Multicolour • Department
          Women
        </p>
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-8\">
        {/* Product Information */}
        <div className=\"space-y-6\">
          <div className=\"bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm\">
            <h3 className=\"text-md font-semibold text-gray-900 mb-4\">
              Product Information
            </h3>

            <div className=\"divide-y divide-gray-200 text-sm\">
              <div className=\"flex justify-between py-3\">
                <span className=\"text-gray-500\">Category</span>
                <span className=\"font-medium text-gray-800\">
                  Women's Fashion
                </span>
              </div>

              <div className=\"flex justify-between py-3\">
                <span className=\"text-gray-500\">Subcategory</span>
                <span className=\"font-medium text-gray-800\">
                  Women's Clothing
                </span>
              </div>

              <div className=\"flex justify-between py-3\">
                <span className=\"text-gray-500\">Brand</span>
                <span className=\"font-medium text-gray-800\">DeFacto</span>
              </div>

              <div className=\"flex justify-between py-3\">
                <span className=\"text-gray-500\">Items Sold</span>
                <span className=\"font-medium text-gray-800\">
                  3,064+ sold
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className=\"bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 shadow-sm\">
          <h3 className=\"text-md font-semibold text-gray-900 mb-4\">
            Key Features
          </h3>

          <div className=\"space-y-4\">
            <div className=\"flex items-center gap-3 text-sm text-gray-600\">
              <FaCheckCircle className=\"w-5 h-5 text-emerald-500 flex-shrink-0\" />
              <span>Premium Quality Product</span>
            </div>

            <div className=\"flex items-center gap-3 text-sm text-gray-600\">
              <FaCheckCircle className=\"w-5 h-5 text-emerald-500 flex-shrink-0\" />
              <span>100% Authentic Guarantee</span>
            </div>

            <div className=\"flex items-center gap-3 text-sm text-gray-600\">
              <FaCheckCircle className=\"w-5 h-5 text-emerald-500 flex-shrink-0\" />
              <span>Fast & Secure Packaging</span>
            </div>

            <div className=\"flex items-center gap-3 text-sm text-gray-600\">
              <FaCheckCircle className=\"w-5 h-5 text-emerald-500 flex-shrink-0\" />
              <span>Quality Tested</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
