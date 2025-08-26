"use client";
import Link from "next/link";

// You can expand/replace these with your real products or fetch from an API
const trendingProducts = [
  {
    name: "Luxury Blackout Curtains",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    href: "/curtains/blackout",
    tag: "Best Seller",
  },
  {
    name: "Premium Cotton Bedding Set",
    image:
      "https://images.unsplash.com/photo-1616628188841-6f9b6b0d07cb?auto=format&fit=crop&w=600&q=80",
    href: "/bedding/duvet-covers",
    tag: "Trending",
  },
  {
    name: "Soft Velvet Cushion Covers",
    image:
      "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?auto=format&fit=crop&w=600&q=80",
    href: "/cushions/velvet",
    tag: "Hot",
  },
  {
    name: "Modern Designer Rug",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    href: "/rugs/designer",
    tag: "New Arrival",
  },
];

export default function TrendingProductsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
            Trending Products
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            See what's most loved by our customers right now.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
          {trendingProducts.map((prod, idx) => (
            <Link
              href={prod.href}
              key={idx}
              className="group bg-gray-50 rounded-2xl border border-gray-100 shadow hover:shadow-xl hover:-translate-y-2 transition overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {prod.tag}
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <h3 className="text-lg text-blue-900 font-semibold text-center group-hover:text-orange-500">
                  {prod.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
