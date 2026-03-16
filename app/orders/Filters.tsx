"use client";

import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

interface FiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const Filters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: FiltersProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sticky top-24 z-10 border border-white/50">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders by ID, product, or address..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg placeholder-gray-400"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400 w-5 h-5" />
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 font-medium min-w-[160px]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};
