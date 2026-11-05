import React from "react";
// Self-contained SVG Icons matching the visual style in the image
const TruckIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8h4.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"
    />
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const HeadsetIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M18.364 5.636a9 9 0 010 12.728m0 0l-.282.282a2.5 2.5 0 01-3.536 0l-.707-.707a2.5 2.5 0 010-3.536l.282-.282m4.243 4.243a3 3 0 00.485-3.657M5.636 5.636a9 9 0 000 12.728m0 0l.282.282a2.5 2.5 0 003.536 0l.707-.707a2.5 2.5 0 000-3.536l-.282-.282m-4.243 4.243a3 3 0 01-.485-3.657"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 19a3 3 0 003-3v-2a3 3 0 00-3-3 3 3 0 00-3 3v2a3 3 0 003 3z"
    />
  </svg>
);
const FeaturesBar = () => {
  const features = [
    {
      icon: TruckIcon,
      title: "Free Shipping",
      description: "On orders over $49",
    },
    {
      icon: RefreshIcon,
      title: "Easy Returns",
      description: "30 days return policy",
    },
    {
      icon: LockIcon,
      title: "Secure Payments",
      description: "100% secure checkout",
    },
    {
      icon: HeadsetIcon,
      title: "24/7 Support",
      description: "We're here to help",
    },
  ];
  return (
    <div className="min-h-[200px] rounded-xl bg-white flex items-center justify-center p-4 sm:p-8  font-sans">
      <div className="w-full max-w-6xl">
        {/* Features Bar Container */}
        <div className="bg-[#f9f9f9] rounded-2xl shadow-sm px-6 py-6 sm:px-10 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className="shrink-0 text-slate-800">
                    <Icon className="w-9 h-9 sm:w-10 sm:h-10" />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBar;
