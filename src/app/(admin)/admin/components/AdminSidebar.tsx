"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white min-h-screen sticky top-0">
      <div className="px-5 py-4 border-b">
        <div className="text-xl font-bold text-blue-700">Admin Panel</div>
        <div className="text-xs text-gray-500">HomeTextileGallery</div>
      </div>

      <nav className="p-3 space-y-1">
        {links.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "block rounded-lg px-3 py-2 text-sm font-medium",
                active
                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
