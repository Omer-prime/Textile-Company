import { dbConnect } from "@/lib/mongoose";
import Feature from "@/models/Feature";

export const runtime = "nodejs";

export default async function FeaturesSection() {
  await dbConnect();
  const features = await Feature.find({}).sort({ order: 1, createdAt: 1 }).lean();

  if (!features.length) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
            Why Choose HomeTextile<span className="text-orange-500">Gallery</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Discover the difference—unmatched quality, care, and service in every product we offer.
          </p>
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-7">
          {features.map((f: any) => (
            <div key={f._id} className="flex flex-col items-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition group p-7 border border-gray-100 hover:-translate-y-2">
              {/* choose icon based on f.iconKey client-side if you want */}
              <div className="mb-4 text-3xl">⭐</div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2 group-hover:text-blue-700">{f.title}</h3>
              <p className="text-gray-500 text-center">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
