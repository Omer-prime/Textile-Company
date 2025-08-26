// src/app/(root)/components/TestimonialsSection.tsx
import { FaStar } from "react-icons/fa";
import { dbConnect } from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";

type TestimonialDoc = {
  _id: string;
  avatar?: string;
  rating: number;
  review: string;
  name: string;
};

export const runtime = "nodejs";

export default async function TestimonialsSection() {
  await dbConnect();

  const testimonials = (await Testimonial.find({})
    .sort({ createdAt: -1 })
    .limit(6)
    .lean<TestimonialDoc[]>()) || [];

  if (!testimonials.length) return null;

  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Real reviews from our clients.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition"
            >
              {t.avatar && (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow mb-4 object-cover"
                />
              )}
              <div className="flex gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-orange-400" />
                ))}
              </div>
              <p className="text-gray-700 text-center mb-3">&ldquo;{t.review}&rdquo;</p>
              <div className="font-semibold text-blue-700">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
