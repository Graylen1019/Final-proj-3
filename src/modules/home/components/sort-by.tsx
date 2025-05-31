import React from "react";

interface SortByProps {
  onSortChange: (value: string) => void;
  sort: string;
  count: number;
}

export const SortBy = ({ sort, onSortChange, count }: SortByProps) => {
  return (
    <div className="w-full h-16 max-w-[720px] flex items-center justify-between mx-auto">
      <div className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        <h1 className="text-center">{count} results</h1>
      </div>
      <div className="items-center text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        <select
          name="sort-by"
          className="bg-gray-800 rounded-2xl p-1 shadow-2xs border border-gray-700 text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
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
    </div>
  );
};
