"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export const ResultsSection = () => {
  return (
    <Suspense>
      <ResultsSectionSuspense />
    </Suspense>
  );
};

const ResultsSectionSuspense = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm.trim()) {
        setError("Please enter a movie title to search.");
        setMovies([]);
        setLoading(false);
        return;
      }

      if (!OMDB_API_KEY) {
        setError(
          "OMDb API key is not configured. Please add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file."
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setMovies([]);

      try {
        const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(
          searchTerm.trim()
        )}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search as Movie[]);
        } else {
          setError(data.Error || `No movies found for "${searchTerm}".`);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to fetch movies: ${err.message}`);
        } else {
          setError("An unknown error occurred while fetching movies.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, OMDB_API_KEY]);

  return (
    <div className="">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          Search Results for {searchTerm}
        </h1>

        {/* Display Loading, Error, or Results */}
        <div className="mt-8 text-center">
          {loading && (
            <p className="text-purple-300 text-lg animate-pulse">
              Fetching movie data...
            </p>
          )}

          {error && (
            <div className="bg-red-900 bg-opacity-40 border border-red-700 text-red-300 p-4 rounded-lg">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && movies.length === 0 && searchTerm.trim() && (
            <p className="text-gray-400 text-lg">
              No results found for {searchTerm}. Try a different title!
            </p>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {movies.map((movie) => (
                <Link
                  key={movie.imdbID}
                  href={`/movies/${movie.imdbID}`}
                  passHref
                >
                  <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out border border-gray-600 flex flex-col items-center text-center p-4 cursor-pointer">
                    {movie.Poster !== "N/A" ? (
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        width={200}
                        height={300}
                        className="rounded-lg shadow-md mb-4 object-cover w-full max-w-[200px] h-[300px]"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            "https://placehold.co/200x300/374151/FFFFFF?text=No+Poster";
                        }}
                      />
                    ) : (
                      <div className="w-full max-w-[200px] h-[300px] bg-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-4">
                        No Poster Available
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {movie.Title}
                    </h2>
                    <p className="text-gray-300 text-sm">({movie.Year})</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
