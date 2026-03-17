"use client";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineSubscriptions } from "react-icons/md";
import {
  RiLeafLine,
  RiTruckLine,
  RiGiftLine,
  RiVipCrownLine as RiCrownLine,
} from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi";

export const NewsletterSection = () => {
  return (
    <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/80 backdrop-blur-sm">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right */}
        <div className="absolute -top-20 -right-20 w-40 sm:w-56 h-40 sm:h-56 bg-cyan-400/15 rounded-full blur-2xl hidden sm:block"></div>

        {/* Bottom Left */}
        <div className="absolute -bottom-20 -left-20 w-44 sm:w-64 h-44 sm:h-64 bg-purple-400/10 rounded-full blur-2xl hidden sm:block"></div>

        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 md:w-96 h-56 sm:h-72 md:h-96 bg-white/5 rounded-full blur-3xl"></div>

        {/* Extra Accent (خفيف جدًا) */}
        <div className="absolute top-10 left-1/3 w-24 h-24 bg-amber-300/10 rounded-full blur-2xl hidden sm:block"></div>
      </div>

      {/* Mobile App Card - Right Side */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-stretch">
          {/* Newsletter Card - Left Side */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md text-gray-800 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-100 hover:border-emerald-200 relative group hover:shadow-emerald-100/50">
            {/* VIP Badge */}
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold shadow-lg transform rotate-3 group-hover:rotate-0 transition-all duration-300 z-10">
              <MdOutlineEmail className="inline mr-0.5 sm:mr-1 text-xs sm:text-sm" />
              NEWSLETTER
            </div>

            {/* Header */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-[10px] sm:text-xs font-medium shadow-sm border border-emerald-200">
                <RiCrownLine className="text-emerald-600 text-sm sm:text-base md:text-lg" />
                VIP ACCESS
              </span>
              <span className="text-xl sm:text-2xl opacity-75">✨</span>
            </div>

            {/* Subscribers Count */}
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-700 leading-tight">
                50,000+
              </h2>
              <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all w-fit">
                Happy Subscribers
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-5 md:mb-6 font-light flex items-start sm:items-center gap-1.5 sm:gap-2 leading-relaxed">
              <MdOutlineSubscriptions className="text-emerald-500 text-base sm:text-lg md:text-xl flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>
                Fresh updates & exclusive offers delivered to your inbox
              </span>
            </p>

            {/* Features - Responsive grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
              {[
                {
                  icon: RiLeafLine,
                  text: "Fresh Picks",
                },
                {
                  icon: RiTruckLine,
                  text: "Free Shipping",
                },
                {
                  icon: RiGiftLine,
                  text: "Special Deals",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-100 to-emerald-200 hover:from-emerald-200 hover:to-emerald-300 text-emerald-700 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium shadow-sm border border-emerald-200/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  <feature.icon className="text-emerald-600 text-base sm:text-lg flex-shrink-0" />
                  <span className="text-xs sm:text-sm truncate">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Email Input */}
            <div className="relative mb-4 sm:mb-5 md:mb-6">
              <div className="relative flex flex-col xs:flex-row gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <MdOutlineEmail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-emerald-400 text-base sm:text-lg" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-400 border-2 border-emerald-100 pl-9 sm:pl-12 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium focus:ring-2 focus:ring-emerald-300/50 focus:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg text-sm sm:text-base h-auto whitespace-nowrap transition-all duration-300 group w-full xs:w-auto">
                  <span className="flex items-center gap-1.5 sm:gap-2 justify-center">
                    Subscribe
                    <span className="text-xs group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </Button>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm bg-white/80 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-sm border border-emerald-100">
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <HiOutlineInformationCircle className="text-emerald-500 text-base sm:text-lg flex-shrink-0" />
              <span className="font-light truncate">
                Unsubscribe anytime. No spam, just good vibes! ✨
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#152531] text-white flex flex-col items-center lg:items-start p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-400/30 relative group hover:shadow-cyan-500/20">
            {/* App Badge */}
            <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold shadow-lg -rotate-6 opacity-90 z-10 text-xs sm:text-sm">
              📱 MOBILE APP
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/20 shadow-md">
                <span className="text-lg">📱</span>
                DOWNLOAD APP
              </span>

              <span className="text-2xl opacity-70 animate-pulse">✨</span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-center lg:text-left leading-tight">
              Shop on the Go
              <span className="block bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent text-sm mt-1">
                Get 15% OFF your first order
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-sm lg:text-base mb-5 md:mb-6 font-light text-center lg:text-left leading-relaxed">
              Exclusive app-only deals & faster checkout experience
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col gap-3 md:gap-4 w-full mb-5 md:mb-6">
              {[
                {
                  icon: FaApple,
                  store: "App Store",
                  color: "bg-white/5 hover:bg-white/10",
                },
                {
                  icon: FaGooglePlay,
                  store: "Google Play",
                  color: "bg-cyan-500/10 hover:bg-cyan-500/20",
                },
              ].map((app, idx) => (
                <button
                  key={idx}
                  className={`flex items-center gap-3 ${app.color} backdrop-blur-sm text-white px-4 md:px-6 py-3 md:py-4 rounded-xl w-full border border-white/10 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <app.icon className="text-2xl group-hover:scale-110 transition-transform" />

                  <div className="text-left flex-1">
                    <p className="text-xs opacity-70 uppercase tracking-wide">
                      Available on
                    </p>
                    <p className="text-base md:text-lg font-bold">
                      {app.store}
                    </p>
                  </div>

                  <span className="text-white/50 opacity-0 group-hover:opacity-100 text-lg transition">
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl w-full border border-white/10 shadow-md hover:shadow-lg transition">
              <div className="flex text-amber-400 text-base md:text-lg gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="hover:scale-110 transition">
                    ★
                  </span>
                ))}
              </div>

              <span className="text-lg font-bold text-white">4.9</span>

              <span className="text-gray-500 hidden xs:inline">•</span>

              <span className="text-gray-300 text-xs md:text-sm truncate">
                120K+ downloads
              </span>
            </div>

            {/* Decorations */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-6 left-6 w-24 h-24 bg-amber-400/10 rounded-full blur-xl -skew-x-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
