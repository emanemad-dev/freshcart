import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineSubscriptions } from "react-icons/md";
import { RiLeafLine, RiTruckLine, RiGiftLine } from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";

export const NewsletterSection = () => {
  return (
    <section className="w-full py-16 px-6 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Newsletter */}
          <div className="lg:col-span-7 bg-white text-gray-900 p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <MdOutlineEmail className="text-lg" />
                NEWSLETTER
              </span>
              <span className="text-green-500 text-3xl">✨</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                50,000+
              </h2>
              <span className="text-green-600 font-medium text-lg bg-green-50 px-4 py-2 rounded-full">
                subscribers
              </span>
            </div>

            <p className="text-gray-600 text-xl mb-8 flex items-center gap-2">
              <MdOutlineSubscriptions className="text-green-500" />
              Get the Freshest Updates Delivered Free
            </p>

            {/* Features as beautiful pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-5 py-2.5 rounded-full font-medium border border-green-200 shadow-sm">
                <RiLeafLine className="text-green-500 text-lg" />
                Fresh Picks Weekly
              </span>
              <span className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-5 py-2.5 rounded-full font-medium border border-green-200 shadow-sm">
                <RiTruckLine className="text-green-500 text-lg" />
                Free Delivery Codes
              </span>
              <span className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-5 py-2.5 rounded-full font-medium border border-green-200 shadow-sm">
                <RiGiftLine className="text-green-500 text-lg" />
                Members-Only Deals
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-4">
              <div className="relative flex-1">
                <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 pl-10 py-6 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 font-semibold px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg">
                Subscribe <span className="ml-2">→</span>
              </Button>
            </div>

            {/* Unsubscribe note with icon */}
            <div className="flex items-center gap-2 text-gray-500 text-sm bg-gray-50 p-3 rounded-lg">
              <HiOutlineInformationCircle className="text-green-500 text-lg" />
              <span>Unsubscribe anytime. No spam, ever.</span>
            </div>
          </div>

          {/* Mobile App */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2E35] to-[#1A4B55] text-white flex flex-col items-center lg:items-start p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-teal-700/30">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                <span className="text-xl">📱</span>
                MOBILE APP
              </span>
              <span className="text-3xl animate-pulse">🚀</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left leading-tight">
              Shop Faster on 
              <span className="text-green-300 block">Our App</span>
            </h2>

            <p className="text-green-100/90 text-lg mb-8 text-center lg:text-left">
              Get app-exclusive deals & 15% off your first order.
            </p>

            <div className="flex flex-col gap-4 w-full">
              <button className="flex items-center gap-4 bg-black/30 hover:bg-black/40 backdrop-blur-sm transition-all duration-300 px-6 py-4 rounded-xl w-full border border-white/10 hover:border-white/20 group">
                <FaApple className="text-4xl text-white/90 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="text-xs text-green-200/80 tracking-wider">DOWNLOAD ON</p>
                  <p className="text-xl font-semibold">App Store</p>
                </div>
                <span className="text-green-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>

              <button className="flex items-center gap-4 bg-black/30 hover:bg-black/40 backdrop-blur-sm transition-all duration-300 px-6 py-4 rounded-xl w-full border border-white/10 hover:border-white/20 group">
                <FaGooglePlay className="text-3xl text-white/90 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1">
                  <p className="text-xs text-green-200/80 tracking-wider">GET IT ON</p>
                  <p className="text-xl font-semibold">Google Play</p>
                </div>
                <span className="text-green-300 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </div>

            <div className="flex items-center gap-3 mt-8 bg-white/5 backdrop-blur-sm p-3 rounded-xl w-full">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl hover:scale-110 transition-transform">★</span>
                ))}
              </div>
              <span className="text-green-100/90 font-medium">4.9</span>
              <span className="text-white/40">•</span>
              <span className="text-green-100/80">100K+ downloads</span>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

