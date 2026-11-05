import React from "react";
const MailIcon = ({ className }) => (
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
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ShieldCheckIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM13.707 8.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);
const NewsletterSubscriptionBanner = () => {
  return (
    <div className="min-h-[220px] bg-blue-900 flex items-center justify-center p-4 sm:p-8 font-sans rounded-xl">
      <div className="w-full max-w-5xl">
        {/* Main Banner Container */}
        <div className="relative overflow-hidden rounded-2xl bg-[#091a2e] border border-blue-900/50 shadow-2xl p-6 sm:p-8 lg:px-10 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Subtle Background Pattern Elements */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Left Content Area: Icon + Heading & Subtitle */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 z-10 w-full lg:w-auto">
            {/* White Circular Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-md">
              <MailIcon className="w-8 h-8 sm:w-10 sm:h-10 text-slate-800" />
            </div>

            {/* Text Description */}
            <div className="max-w-md">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight mb-1.5">
                Stay in the Loop
              </h2>
              <p className="text-blue-100/70 text-xs sm:text-sm leading-relaxed font-normal">
                Get exclusive deals, new arrivals and style inspiration straight
                to your inbox.
              </p>
            </div>
          </div>
          {/* Right Content Area: Input Pill + Privacy Text */}
          <div className="flex flex-col items-center sm:items-start lg:items-end w-full lg:w-auto z-10">
            {/* Input & Subscribe Button Pill */}
            <div className="relative w-full sm:w-[420px] bg-white rounded-full p-1.5 flex items-center shadow-inner">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent pl-5 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                className="bg-[#d2e3c8] hover:bg-[#c3d8b7] text-slate-800 font-medium text-sm px-6 py-2.5 rounded-full transition-colors duration-200 shrink-0"
              >
                Subscribe
              </button>
            </div>

            {/* Privacy Note */}
            <div className="flex items-center gap-1.5 text-blue-200/60 text-[11px] sm:text-xs mt-3.5 px-2">
              <ShieldCheckIcon className="w-4 h-4 text-amber-400/90 shrink-0" />
              <span>We respect your privacy. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscriptionBanner;
