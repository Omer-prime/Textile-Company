"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[380px] md:h-[520px] flex items-center justify-center text-center overflow-hidden">
      {/* Background image & overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/Bedsheet.jpg"
          alt="Home Textiles"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-blue-950/60" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow mb-4 leading-tight">
          Beautiful Textiles <br className="hidden sm:block" />
          for Every Room
        </h1>
        <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-lg">
          Explore our premium curtains, bedding, cushions, and more.
          Elevate your space with quality and style.
        </p>
        <Link
          href="/curtains"
          className="inline-block rounded-full bg-orange-500 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition transform"
        >
          Discover Collections
        </Link>
      </div>
    </section>
  );
}
