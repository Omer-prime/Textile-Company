"use client";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./Searchbar";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/curtains", label: "Curtains", mega: true },
    { href: "/bedding", label: "Bedding", mega: true },
    { href: "/cushions", label: "Cushions" },
    { href: "/sofas", label: "Sofas" },
    { href: "/rugs", label: "Rugs" },
    { href: "/lighting", label: "Lighting" },
    { href: "/wallart", label: "Wall Art" },
    { href: "/tableware", label: "Tableware" },
    { href: "/decor", label: "Decor" },
];

const megaMenus: Record<
    string,
    { title: string; links: { href: string; label: string }[]; img: string }[]
> = {
    curtains: [
        {
            title: "By Style",
            links: [
                { href: "/curtains/blackout", label: "Blackout Curtains" },
                { href: "/curtains/sheers", label: "Sheers & Voiles" },
                { href: "/curtains/patterned", label: "Patterned" },
                { href: "/curtains/eyelet", label: "Eyelet Curtains" },
            ],
            img:
                "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80",
        },
        {
            title: "By Room",
            links: [
                { href: "/curtains/living-room", label: "Living Room" },
                { href: "/curtains/bedroom", label: "Bedroom" },
                { href: "/curtains/kids", label: "Kids Room" },
            ],
            img:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80",
        },
    ],
    bedding: [
        {
            title: "Bedding Sets",
            links: [
                { href: "/bedding/duvet-covers", label: "Duvet Covers" },
                { href: "/bedding/sheet-sets", label: "Sheet Sets" },
                { href: "/bedding/quilt-sets", label: "Quilt Sets" },
            ],
            img:
                "https://images.unsplash.com/photo-1616628188841-6f9b6b0d07cb?auto=format&fit=crop&w=300&q=80",
        },
        {
            title: "Pillows & Protectors",
            links: [
                { href: "/bedding/pillows", label: "Pillows" },
                { href: "/bedding/protectors", label: "Protectors" },
            ],
            img:
                "https://images.unsplash.com/photo-1583845112203-29329902330b?auto=format&fit=crop&w=300&q=80",
        },
    ],
};

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [megaOpen, setMegaOpen] = useState<string | null>(null);

    // Utility to handle mega menu open/close
    const handleMegaEnter = (key: string) => setMegaOpen(key);
    const handleMegaLeave = () => setMegaOpen(null);

    return (
        <header className="sticky top-0 z-30 bg-white/95 shadow-md backdrop-blur border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col items-stretch px-4 md:px-10">
                {/* Logo Row */}
                <div className="flex items-center justify-between py-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-3xl text-blue-700"
                    >
                        <span className="tracking-tight">HomeTextile</span>
                        <span className="text-orange-500 font-extrabold">Gallery</span>
                    </Link>
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-2xl text-blue-700"
                        onClick={() => setMobileMenu((prev) => !prev)}
                        aria-label="Toggle navigation"
                    >
                        <i className={`fa-solid ${mobileMenu ? "fa-xmark" : "fa-bars"}`}></i>
                    </button>
                </div>

                {/* Nav Row */}
                <nav className="hidden md:flex items-center justify-center gap-10 py-2 relative">
                    {navLinks.map((nav) =>
                        nav.mega ? (
                            <div
                                key={nav.href}
                                className="relative group"
                                onMouseEnter={() => handleMegaEnter(nav.label.toLowerCase())}
                                onMouseLeave={handleMegaLeave}
                            >
                                <Link
                                    href={nav.href}
                                    className="text-gray-700 font-semibold px-3 py-1 rounded-md hover:bg-blue-50 hover:text-blue-700 transition"
                                >
                                    {nav.label}
                                    <i className="fa-solid fa-angle-down text-xs ml-1"></i>
                                </Link>
                                {/* Mega Menu */}
                                {megaOpen === nav.label.toLowerCase() && (
                                    <div className="mega-menu-box absolute left-0 top-[110%] z-40 animate-fadeIn">
                                        {megaMenus[nav.label.toLowerCase()]?.map((section) => (
                                            <div key={section.title} className="mega-menu-col">
                                                <h4 className="text-blue-700 font-bold mb-2">{section.title}</h4>
                                                {section.links.map((sublink) => (
                                                    <Link
                                                        key={sublink.href}
                                                        href={sublink.href}
                                                         className="relative text-gray-700 font-semibold px-3 py-1 rounded-md transition
          before:absolute before:left-0 before:-bottom-0.5 before:h-[2px] before:w-0 before:bg-blue-700
          before:transition-all before:duration-200 hover:before:w-full hover:text-blue-700"
                                                    >
                                                        {sublink.label}
                                                    </Link>
                                                ))}
                                                <img
                                                    src={section.img}
                                                    alt={section.title}
                                                    className="mega-menu-img"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={nav.href}
                                href={nav.href}
                               className="relative text-gray-700 font-semibold px-3 py-1 rounded-md transition
  before:absolute before:left-0 before:-bottom-0.5 before:h-[2px] before:w-0 before:bg-blue-700
  before:transition-all before:duration-200 hover:before:w-full hover:text-blue-700"

                            >
                                {nav.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* Search bar under nav row (desktop only) */}
                <div className="hidden md:block bg-white/90 border-t border-b border-gray-100 py-3">
                    <div className="max-w-2xl mx-auto">
                        <SearchBar />
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileMenu && (
                    <div className="md:hidden bg-white border-t px-4 pb-6 animate-slideDown z-50">
                        <nav className="flex flex-col gap-2 pt-3">
                            {navLinks.map((nav) =>
                                nav.mega && megaMenus[nav.label.toLowerCase()] ? (
                                    <details key={nav.href} className="group">
                                        <summary className="flex items-center py-2 text-gray-700 font-semibold hover:text-blue-700 cursor-pointer select-none">
                                            {nav.label}
                                            <i className="fa-solid fa-angle-down text-xs ml-2 group-open:rotate-180 transition-transform"></i>
                                        </summary>
                                        <div className="pl-3 pt-2">
                                            {megaMenus[nav.label.toLowerCase()]?.map((section) => (
                                                <div key={section.title} className="mb-3">
                                                    <div className="text-blue-700 font-bold mb-1">
                                                        {section.title}
                                                    </div>
                                                    {section.links.map((sublink) => (
                                                        <Link
                                                            key={sublink.href}
                                                            href={sublink.href}
                                                            className="block text-gray-700 text-[15px] hover:text-orange-500 py-0.5 transition"
                                                            onClick={() => setMobileMenu(false)}
                                                        >
                                                            {sublink.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                ) : (
                                    <Link
                                        key={nav.href}
                                        href={nav.href}
                                        className="py-2 text-gray-700 font-semibold hover:text-blue-700"
                                        onClick={() => setMobileMenu(false)}
                                    >
                                        {nav.label}
                                    </Link>
                                )
                            )}
                        </nav>
                        <div className="mt-5">
                            <SearchBar />
                        </div>
                    </div>
                )}
            </div>

            {/* Mega menu animation & mobile slide */}
        
        </header>
    );
}
