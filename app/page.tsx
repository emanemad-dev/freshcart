// Home Page
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to FreshCart
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your one-stop shop for all your needs. Fresh products, great prices, fast delivery.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-blue-600 border-white hover:bg-white hover:text-blue-600">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FreshCart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered to your doorstep quickly</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We ensure the highest quality for all our products</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Great Prices</h3>
              <p className="text-gray-600">Competitive prices on all your favorite items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Electronics', 'Clothing', 'Home & Garden', 'Sports'].map((category) => (
              <Link
                key={category}
                href="/categories"
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow text-center"
              >
                <h3 className="font-semibold">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

