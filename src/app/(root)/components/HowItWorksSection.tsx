"use client";
import { FaSearch, FaShoppingBag, FaShippingFast, FaSmile } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch className="text-blue-700 text-3xl mb-3" />,
    title: "Browse Collections",
    description: "Explore our premium range of curtains, bedding, and more—organized by category and style for your convenience.",
  },
  {
    icon: <FaShoppingBag className="text-orange-500 text-3xl mb-3" />,
    title: "Easy Ordering",
    description: "Find your favorites, customize by color or size, and place your order through our user-friendly process.",
  },
  {
    icon: <FaShippingFast className="text-green-600 text-3xl mb-3" />,
    title: "Fast Shipping",
    description: "We pack and ship your products quickly—so you can enjoy your new home textiles without delay.",
  },
  {
    icon: <FaSmile className="text-purple-500 text-3xl mb-3" />,
    title: "Enjoy Your Space",
    description: "Experience the comfort, style, and quality that transforms your living spaces into something special.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Shopping for premium textiles is simple—just follow these easy steps!
          </p>
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition p-8 border border-blue-100"
            >
              <div>{step.icon}</div>
              <h3 className="font-semibold text-lg text-blue-800 mb-2 mt-1">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
              <span className="mt-4 text-xs text-blue-400 font-bold opacity-70">Step {idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
