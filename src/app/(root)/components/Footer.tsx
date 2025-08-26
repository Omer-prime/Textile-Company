"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPinterestP, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Logo & tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3 font-bold text-2xl">
              <span>HomeTextile</span>
              <span className="text-orange-400">Gallery</span>
            </Link>
            <p className="text-blue-100 mt-2">
              Beautiful, premium textiles for every room. Elevate your living spaces with quality and style.
            </p>
          </div>
          {/* Pages */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-orange-300">Pages</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline hover:text-orange-400 transition">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline hover:text-orange-400 transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline hover:text-orange-400 transition">Contact</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline hover:text-orange-400 transition">FAQ</Link>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-orange-300">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/curtains" className="hover:underline hover:text-orange-400 transition">Curtains</Link></li>
              <li><Link href="/bedding" className="hover:underline hover:text-orange-400 transition">Bedding</Link></li>
              <li><Link href="/cushions" className="hover:underline hover:text-orange-400 transition">Cushions</Link></li>
              <li><Link href="/sofas" className="hover:underline hover:text-orange-400 transition">Sofas</Link></li>
            </ul>
          </div>
          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-lg mb-3 text-orange-300">Contact</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-orange-400" /> 
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-orange-400" />
                <span>info@hometextilegallery.com</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-2">
              <a href="#" aria-label="Facebook" className="bg-blue-800 hover:bg-orange-400 p-2 rounded-full transition">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" className="bg-blue-800 hover:bg-orange-400 p-2 rounded-full transition">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Pinterest" className="bg-blue-800 hover:bg-orange-400 p-2 rounded-full transition">
                <FaPinterestP />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="text-blue-100 text-sm">
            &copy; {new Date().getFullYear()} HomeTextileGallery. All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 text-xs text-blue-200 opacity-80">
            Designed & Developed  By <span className="font-semibold text-orange-300">Omer Prime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
