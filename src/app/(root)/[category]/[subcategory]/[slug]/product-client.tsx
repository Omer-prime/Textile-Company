"use client";
import { useMemo, useState } from "react";

type VariantImg = { url: string; alt?: string; sortOrder?: number };
type Variant = { colorName?: string; colorHex?: string; images?: VariantImg[] };
type ProductDoc = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sizes?: string[];
  variants?: Variant[];
};

export default function ProductDetailClient({ product }: { product: ProductDoc }) {
  const firstColor = product.variants?.[0]?.colorName || "";
  const [color, setColor] = useState<string>(firstColor);

  const currentVariant = useMemo(
    () => product.variants?.find(v => v.colorName === color) || product.variants?.[0],
    [color, product.variants]
  );

  const hero = currentVariant?.images?.[0]?.url || product.image || "/placeholder.png";

  return (
    <div className="max-w-5xl mx-auto py-14 px-4 flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <img src={hero} alt={product.name} className="w-full rounded-xl shadow object-cover mb-4 h-80" />
        <div className="flex gap-3 mt-3">
          {(product.variants || []).map((v, idx) => (
            <button
              key={idx}
              className={`w-9 h-9 rounded-full border-2 ${color === v.colorName ? "border-blue-600" : "border-gray-300"} transition`}
              style={{ background: v.colorHex || "#ddd" }}
              title={v.colorName}
              onClick={() => setColor(v.colorName || "")}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-3">{product.name}</h1>
        {product.description && <p className="mb-6 text-gray-700">{product.description}</p>}
        {!!product.sizes?.length && (
          <div className="text-sm text-gray-600 mb-3">
            Sizes: {product.sizes.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
