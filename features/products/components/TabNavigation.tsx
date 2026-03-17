"use client";

import { FC } from 'react';


interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ratingsQuantity: number;
}

export const TabNavigation: FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  ratingsQuantity,
}) => {
  return (
    <div className=\"flex space-x-1 border-b\">
      <button
        onClick={() => onTabChange(\"details\")}
        className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "details"
            ? "text-emerald-600 border-b-2 border-emerald-600"
            : "text-gray-500 hover:text-gray-700"}`}
      >
        Product Details
      </button>
      <button
        onClick={() => onTabChange(\"reviews\")}
        className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "reviews"
            ? "text-emerald-600 border-b-2 border-emerald-600"
            : "text-gray-500 hover:text-gray-700"}`}
      >
        Reviews ({ratingsQuantity || 0})
      </button>
      <button
        onClick={() => onTabChange(\"shipping\")}
        className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === "shipping"
            ? "text-emerald-600 border-b-2 border-emerald-600"
            : "text-gray-500 hover:text-gray-700"}`}
      >
        Shipping & Returns
      </button>
    </div>
  );
};
