import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

export const EmptyOrders = () => {
  return (
    <div className="text-center py-32 px-5">
      <div className="mx-auto max-w-md">
        <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <FaShoppingBag className="w-20 h-20 text-emerald-500" />
        </div>

        <h3 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h3>
        <p className="text-xl text-gray-500 mb-12 max-w-sm mx-auto leading-relaxed">
          Your shopping journey starts here. Once you place your first order,
          you'll be able to track and manage it right from this page.
        </p>

        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full max-w-sm mx-auto bg-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-3 mx-auto"
          >
            Start Shopping
          </Link>
          <Link
            href="/brands"
            className="block w-full max-w-sm mx-auto text-emerald-600 font-semibold py-4 px-8 rounded-2xl hover:bg-emerald-50 transition-all border-2 border-emerald-200 hover:border-emerald-300 text-lg flex items-center justify-center mx-auto"
          >
            Explore Brands
          </Link>
        </div>
      </div>
    </div>
  );
};
