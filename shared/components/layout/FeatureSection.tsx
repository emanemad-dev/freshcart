import {
  BiSolidTruck,
  BiRotateLeft,
  BiSolidCreditCard,
  BiHeadphone,
} from "react-icons/bi";

export function FeatureSection() {
  const features = [
    {
      icon: BiSolidTruck,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      icon: BiRotateLeft,
      title: "Easy Returns",
      desc: "14-day return policy",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: BiSolidCreditCard,
      title: "Secure Payment",
      desc: "100% secure checkout",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: BiHeadphone,
      title: "24/7 Support",
      desc: "Contact us anytime",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 w-full bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30">
      <div className="mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-100/60 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 sm:gap-3 group hover:bg-white"
              >
                {/* icon */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                >
                  <Icon
                    className={`text-base sm:text-xl ${feature.iconColor}`}
                  />
                </div>

                {/* text */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base truncate">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
