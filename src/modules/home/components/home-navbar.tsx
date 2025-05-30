"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/modules/home/components/search-input";

export const HomeNavbar = () => {
  // State to store the user's search term in the input field.
  const [searchTerm, setSearchTerm] = useState("");
  // Initialize the Next.js router for programmatic navigation.
  const router = useRouter();

  // Function to handle the form submission on the home page.
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If a search term is entered, navigate to the /search page with the query parameter.
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
    
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 sm:p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-700 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          Welcome to OMDb Movie Search
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Find information about your favorite movies and TV shows.
        </p>
        <SearchInput
          onSubmit={handleSearchSubmit}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
