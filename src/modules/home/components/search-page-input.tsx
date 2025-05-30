import { useRouter } from "next/router";
import { useState } from "react";

interface SearchInputProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchPageInput = ({
  onSubmit,
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <form
      className="flex flex-col sm:flex-row gap-4 w-full max-w-[900px] mx-auto mt-12"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="Search for a movie title..."
        className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        value={value}
        onChange={onChange}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-200 transform hover:scale-105"
      >
        Search
      </button>
    </form>
  );
};
