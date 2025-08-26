// scripts/seed.ts
import "dotenv/config";
import mongoose from "mongoose";
import { dbConnect } from "../src/lib/mongoose";
import Category from "../src/models/Category";
import Product from "../src/models/Product";
import Testimonial from "../src/models/Testimonial";

async function main() {
  await dbConnect();

  console.log("⚙️  Clearing collections…");
  await Promise.all([
    Category.deleteMany({}),
    Product.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  console.log("📦 Seeding categories…");
  const curtains = await Category.create({
    name: "Curtains",
    slug: "curtains",
    description: "All types of curtains",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
  });

  const bedding = await Category.create({
    name: "Bedding",
    slug: "bedding",
    description: "Bedding sets and more",
    image: "https://images.unsplash.com/photo-1616628188841-6f9b6b0d07cb",
  });

  console.log("🧵 Seeding products…");
  await Product.create([
    {
      name: "Luxury Blackout Curtain",
      slug: "luxury-blackout-curtain",
      categoryId: curtains._id,
      categorySlug: "curtains",
      subcategory: "blackout",
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      variants: [
        {
          colorName: "Navy",
          colorHex: "#1f3a5f",
          images: [
            {
              url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
              alt: "Navy blackout curtain",
              sortOrder: 0,
            },
          ],
        },
        {
          colorName: "Cream",
          colorHex: "#f5f0e6",
          images: [
            {
              url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
              alt: "Cream blackout curtain",
              sortOrder: 0,
            },
          ],
        },
      ],
      sizes: [
        { label: "52x84", value: "52x84" },
        { label: "52x96", value: "52x96" },
      ],
      description: "Premium blackout curtain for restful sleep and luxury look.",
    },
    {
      name: "Egyptian Cotton Duvet Set",
      slug: "egyptian-cotton-duvet-set",
      categoryId: bedding._id,
      categorySlug: "bedding",
      subcategory: "duvet-covers",
      image:
        "https://images.unsplash.com/photo-1616628188841-6f9b6b0d07cb?auto=format&fit=crop&w=600&q=80",
      variants: [
        {
          colorName: "White",
          colorHex: "#ffffff",
          images: [
            {
              url: "https://images.unsplash.com/photo-1616628188841-6f9b6b0d07cb?auto=format&fit=crop&w=600&q=80",
              alt: "White duvet set",
              sortOrder: 0,
            },
          ],
        },
        {
          colorName: "Blue",
          colorHex: "#2a5c8d",
          images: [
            {
              url: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?auto=format&fit=crop&w=600&q=80",
              alt: "Blue duvet set",
              sortOrder: 0,
            },
          ],
        },
      ],
      sizes: [
  { label: "52x84", value: "52x84" },
  { label: "52x96", value: "52x96" },
],
      description: "Soft, luxurious Egyptian cotton duvet set.",
    },
  ]);

  console.log("⭐ Seeding testimonials…");
  await Testimonial.create([
    {
      name: "Sarah M.",
      rating: 5,
      review:
        "Absolutely loved the quality! The bedding set was even better than pictured.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Imran Q.",
      rating: 5,
      review:
        "The curtains are beautiful and the team was super helpful. Room looks amazing.",
      avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    },
  ]);

  console.log("✅ Seeding done.");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
    process.exit();
  });
