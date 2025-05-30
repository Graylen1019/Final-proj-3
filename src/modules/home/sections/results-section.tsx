'use client'; // This directive marks this component as a Client Component.

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams to read URL query parameters
import Link from 'next/link'; // Import Link for client-side navigation

// Define the interface for a Movie object as returned by the OMDb API search
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// This is the Search Page component for our Next.js application.
// It fetches and displays movie results based on the 'query' URL parameter.
export const ResultsSection = () => {
  // Get search parameters from the URL.
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query') || ''; // Get the 'query' parameter, default to empty string

  // State to store the fetched movie data. Explicitly typing it as an array of Movie objects.
  const [movies, setMovies] = useState<Movie[]>([]);
  // State to manage the loading status during API calls.
  const [loading, setLoading] = useState(true); // Set to true initially as data fetching starts on mount
  // State to store any error messages from the API or fetch operation.
  // Explicitly typing the error state to be either a string or null.
  const [error, setError] = useState<string | null>(null);

  // Retrieve the OMDb API key from environment variables.
  // It's crucial to prefix with NEXT_PUBLIC_ for client-side access in Next.js.
  const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

  // useEffect hook to fetch movies whenever the searchTerm changes.
  useEffect(() => {
    const fetchMovies = async () => {
      // If no search term is provided, don't fetch.
      if (!searchTerm.trim()) {
        setError('Please enter a movie title to search.');
        setMovies([]);
        setLoading(false);
        return;
      }

      // Check if the API key is available.
      if (!OMDB_API_KEY) {
        setError('OMDb API key is not configured. Please add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file.');
        setLoading(false);
        return;
      }

      setLoading(true); // Set loading state to true before fetching.
      setError(null);   // Clear any previous errors.
      setMovies([]);    // Clear previous search results.

      try {
        // Construct the API URL for searching movies by title (s parameter).
        const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm.trim())}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(apiUrl);

        // Check if the network response was successful.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // OMDb API returns { Response: "True", Search: [...] } on success
        // and { Response: "False", Error: "..." } on failure (e.g., no results).
        if (data.Response === "True") {
          // Ensure data.Search is an array of Movie objects before setting the state.
          setMovies(data.Search as Movie[]);
        } else {
          // Handle cases where the API returns an error or no results.
          setError(data.Error || `No movies found for "${searchTerm}".`);
        }
      } catch (err: unknown) { // Explicitly type err as unknown
        // Safely check if err is an instance of Error before accessing its message property.
        if (err instanceof Error) {
          setError(`Failed to fetch movies: ${err.message}`);
        } else {
          setError('An unknown error occurred while fetching movies.');
        }
      } finally {
        setLoading(false); // Always set loading to false after the operation.
      }
    };

    fetchMovies(); // Call the fetch function when the component mounts or searchTerm changes
  }, [searchTerm, OMDB_API_KEY]); // Dependency array: re-run effect if searchTerm or API key changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 sm:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          Search Results for "{searchTerm}"
        </h1>

        {/* Display Loading, Error, or Results */}
        <div className="mt-8 text-center">
          {loading && (
            <p className="text-purple-300 text-lg animate-pulse">Fetching movie data...</p>
          )}

          {error && (
            <div className="bg-red-900 bg-opacity-40 border border-red-700 text-red-300 p-4 rounded-lg">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && movies.length === 0 && searchTerm.trim() && (
            <p className="text-gray-400 text-lg">No results found for "{searchTerm}". Try a different title!</p>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {movies.map((movie) => (
                // Wrap each movie card with a Link component
                <Link key={movie.imdbID} href={`/movies/${movie.imdbID}`} passHref>
                  <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out border border-gray-600 flex flex-col items-center text-center p-4 cursor-pointer">
                    {/* Using a standard <img> tag as next/image is not resolvable */}
                    {movie.Poster !== 'N/A' ? (
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        width={200} // Set a base width
                        height={300} // Set a base height (adjust aspect ratio if needed)
                        className="rounded-lg shadow-md mb-4 object-cover w-full max-w-[200px] h-[300px]"
                        // Add a fallback for image loading errors
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          // Cast e.target to HTMLImageElement to access its properties
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop
                          target.src = 'https://placehold.co/200x300/374151/FFFFFF?text=No+Poster';
                        }}
                      />
                    ) : (
                      <div className="w-full max-w-[200px] h-[300px] bg-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-4">
                        No Poster Available
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-white mb-1">{movie.Title}</h2>
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
}
