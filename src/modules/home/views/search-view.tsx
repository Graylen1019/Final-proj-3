"use client";

import { useState } from "react";
import { ResultsSection } from "../sections/results-section";
import { useRouter } from "next/navigation";
import { SearchPageInput } from "../components/search-page-input";

export const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 sm:p-8 flex flex-col items-center font-sans gap-6">
      <SearchPageInput
        onSubmit={handleSearchSubmit}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ResultsSection />
    </div>
  );
};
