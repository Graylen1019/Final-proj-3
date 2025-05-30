"use client";

import { useState } from "react";
import { SearchInput } from "../components/search-input";
import { ResultsSection } from "../sections/results-section";
import { useRouter } from "next/navigation";

export const SearchView = () => {
      // State to store the user's search term in the input field.
      const [searchTerm, setSearchTerm] = useState("");
      // Initialize the Next.js router for programmatic navigation.
      const router = useRouter();
    
      // Function to handle the form submission on the home page.
      const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // If a search term is entered, navigate to the /search page with the query parameter.
        if (searchTerm.trim()) {
            router.push("/")
          router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
      };

  return (
    <div>
      <SearchInput
        onSubmit={handleSearchSubmit}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ResultsSection />
    </div>
  );
};
