"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    // Navigate to the search results page with the query as a URL param
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex bg-white rounded-full shadow-md border border-gray-200 focus-within:border-blue-500 transition px-2 py-1 items-center max-w-xl mx-auto"
      style={{ minHeight: 46 }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search curtains, bedding, cushions..."
        className="flex-1 px-4 py-2 text-gray-800 bg-transparent border-none focus:ring-0 outline-none rounded-full placeholder-gray-400"
      />
      <button
        type="submit"
        className="ml-2 rounded-full bg-blue-600 text-white px-4 py-2 hover:bg-orange-500 transition font-semibold flex items-center gap-1"
      >
        <i className="fa-solid fa-search"></i>
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
