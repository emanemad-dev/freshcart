import {
  BiSolidTruck,
  BiRotateLeft,
  BiSolidCreditCard,
  BiHeadphone,
} from "react-icons/bi";

export function FeaturesSection() {
  const features = [
    {
      icon: BiSolidTruck,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
    },
    { icon: BiRotateLeft, title: "Easy Returns", desc: "14-day return policy" },
    {
      icon: BiSolidCreditCard,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    { icon: BiHeadphone, title: "24/7 Support", desc: "Contact us anytime" },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              // <div key={idx} className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              //   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              //     <Icon className="text-green-600 text-2xl" />
              //   </div>
              //   <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              //   <p className="text-gray-600 text-sm">{feature.desc}</p>
              // </div>
              <div
                key={idx}
                className="flex flex-col items-center gap-3 p-4 bg-green-100 rounded-xl shadow-md transition-shadow hover:shadow-lg
             animate-float"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Icon className="text-white text-2xl" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
