import React from "react";

interface SortByProps {
  onSortChange: (value: string) => void;
  sort: string;
}

export const SortBy = ({ sort, onSortChange }: SortByProps) => {
  return (
    <div className="p-8 w-full h-16 max-w-[720px] flex items-center justify-center mx-auto">
      <select
        name="sort-by"
        className="bg-gray-800 p-1 rounded-2xl shadow-2xl border border-gray-700 text-lg text-purple-400"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option className="text-purple-400" value="">
          Sort by
        </option>
        <option className="text-purple-400" value="A_Z">
          Title: A-Z
        </option>
        <option className="text-purple-400" value="Z_A">
          Title: Z-A
        </option>
        <option className="text-purple-400" value="DESC">
          Date: DESC
        </option>
        <option className="text-purple-400" value="ASC">
          Date: ASC
        </option>
      </select>
    </div>
  );
};
