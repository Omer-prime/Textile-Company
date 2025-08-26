export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  slug: string;
  image: string;
  colors: string[];
  imagesByColor: Record<string, string[]>;
  description: string;
};

export const products: Product[] = [
  // Curtains
  {
    id: "curt-1",
    name: "Luxury Blackout Curtain",
    category: "curtains",
    subcategory: "blackout",
    slug: "luxury-blackout-curtain",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    colors: ["navy", "cream", "grey"],
    imagesByColor: {
      navy: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      ],
      cream: [
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
      ],
      grey: [
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Premium blackout curtain for restful sleep and luxury look.",
  },
  {
    id: "curt-2",
    name: "Sheer Voile Curtain",
    category: "curtains",
    subcategory: "sheers",
    slug: "sheer-voile-curtain",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    colors: ["white", "ivory"],
    imagesByColor: {
      white: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      ],
      ivory: [
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Elegant sheer curtain for soft light and privacy.",
  },
  {
    id: "curt-3",
    name: "Patterned Eyelet Curtain",
    category: "curtains",
    subcategory: "eyelet",
    slug: "patterned-eyelet-curtain",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
    colors: ["blue", "yellow", "grey"],
    imagesByColor: {
      blue: [
        "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
      ],
      yellow: [
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      ],
      grey: [
        "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Modern patterned curtain with easy-fit eyelets.",
  },

  // Bedding
  {
    id: "bed-1",
    name: "Egyptian Cotton Duvet Set",
    category: "bedding",
    subcategory: "duvet-covers",
    slug: "egyptian-cotton-duvet-set",
    image: "https://images.unsplash.com/photo-1616628188841-6f9b6b0d07cb?auto=format&fit=crop&w=600&q=80",
    colors: ["white", "blue", "pink"],
    imagesByColor: {
      white: [
        "https://images.unsplash.com/photo-1616628188841-6f9b6b0d07cb?auto=format&fit=crop&w=600&q=80",
      ],
      blue: [
        "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?auto=format&fit=crop&w=600&q=80",
      ],
      pink: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Soft, luxurious Egyptian cotton duvet set for ultimate comfort.",
  },
  {
    id: "bed-2",
    name: "Flannel Sheet Set",
    category: "bedding",
    subcategory: "sheet-sets",
    slug: "flannel-sheet-set",
    image: "https://images.unsplash.com/photo-1583845112203-29329902330b?auto=format&fit=crop&w=600&q=80",
    colors: ["grey", "cream", "red"],
    imagesByColor: {
      grey: [
        "https://images.unsplash.com/photo-1583845112203-29329902330b?auto=format&fit=crop&w=600&q=80",
      ],
      cream: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      ],
      red: [
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Warm, cozy flannel sheets for a restful night.",
  },
  {
    id: "bed-3",
    name: "Silk Pillowcase Pair",
    category: "bedding",
    subcategory: "pillows",
    slug: "silk-pillowcase-pair",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
    colors: ["ivory", "pink", "black"],
    imagesByColor: {
      ivory: [
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
      ],
      pink: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
      ],
      black: [
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Luxury silk pillowcases for smooth, healthy hair.",
  },

  // Cushions
  {
    id: "cus-1",
    name: "Velvet Cushion Cover",
    category: "cushions",
    subcategory: "velvet",
    slug: "velvet-cushion-cover",
    image: "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?auto=format&fit=crop&w=600&q=80",
    colors: ["red", "yellow", "black"],
    imagesByColor: {
      red: [
        "https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?auto=format&fit=crop&w=600&q=80",
      ],
      yellow: [
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      ],
      black: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Soft velvet cushion cover for a premium touch.",
  },
  {
    id: "cus-2",
    name: "Linen Cushion Cover",
    category: "cushions",
    subcategory: "linen",
    slug: "linen-cushion-cover",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
    colors: ["grey", "cream"],
    imagesByColor: {
      grey: [
        "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=80",
      ],
      cream: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Breathable linen cushion for stylish comfort.",
  },

  // Sofas
  {
    id: "sofa-1",
    name: "Modern Designer Sofa",
    category: "sofas",
    subcategory: "designer",
    slug: "modern-designer-sofa",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    colors: ["navy", "beige", "grey"],
    imagesByColor: {
      navy: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      ],
      beige: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      ],
      grey: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Stylish, modern designer sofa for your living room.",
  },
  {
    id: "sofa-2",
    name: "Classic Leather Sofa",
    category: "sofas",
    subcategory: "leather",
    slug: "classic-leather-sofa",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    colors: ["brown", "black"],
    imagesByColor: {
      brown: [
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      ],
      black: [
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
      ],
    },
    description: "Classic leather sofa with timeless appeal.",
  },
];
