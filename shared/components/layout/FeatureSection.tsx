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
      color: "text-green-600 bg-green-100",
    },
    {
      icon: BiRotateLeft,
      title: "Easy Returns",
      desc: "14-day return policy",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: BiSolidCreditCard,
      title: "Secure Payment",
      desc: "100% secure checkout",
      color: "text-purple-600 bg-purple-100",
    },
    {
      icon: BiHeadphone,
      title: "24/7 Support",
      desc: "Contact us anytime",
      color: "text-orange-600 bg-orange-100",
    },
  ];

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex items-start gap-4"
              >
                {/* icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${feature.color}`}
                >
                  <Icon className="text-2xl" />
                </div>

                {/* text */}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
