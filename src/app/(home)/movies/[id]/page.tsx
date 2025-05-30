'use client'; // This directive marks this component as a Client Component to enable client-side interactivity.

// Define a more comprehensive interface for detailed movie data
interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string; // "True" or "False"
  Error?: string; // If Response is "False"
}

// This component fetches and displays individual movie details.
// It receives the imdbID from the URL parameters via the 'params' prop.
// Since it's now a Client Component, data fetching will occur on the client side.
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use useParams for client components in App Router
import Link from 'next/link';

export default function MovieDetailPage() {
  const params = useParams();
  const imdbID = params.id as string; // Extract the imdbID from the dynamic route parameters

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY; // Accessing environment variable

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!OMDB_API_KEY) {
        setError('OMDb API key is not configured. Please add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const apiUrl = `https://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${OMDB_API_KEY}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: MovieDetail = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || 'Movie details not found.');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to fetch movie details: ${err.message}`);
        } else {
          setError('An unknown error occurred while fetching movie details.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID, OMDB_API_KEY]); // Re-fetch if imdbID or API key changes

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-8 flex items-center justify-center font-sans">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <p className="text-lg text-gray-400 animate-pulse">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-8 flex items-center justify-center font-sans">
        <div className="bg-red-900 bg-opacity-40 border border-red-700 text-red-300 p-6 rounded-lg text-center">
          <p className="font-bold text-xl">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-8 flex items-center justify-center font-sans">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <p className="text-lg text-gray-400">Movie not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 sm:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-700">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          {movie.Title} ({movie.Year})
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              width={300}
              height={450}
              className="rounded-lg shadow-xl mb-4 md:mb-0 flex-shrink-0 object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://placehold.co/300x450/374151/FFFFFF?text=No+Poster';
              }}
            />
          ) : (
            <div className="w-[300px] h-[450px] bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-lg flex-shrink-0">
              No Poster Available
            </div>
          )}

          <div className="text-left space-y-3">
            <p className="text-lg"><strong className="text-purple-300">Genre:</strong> {movie.Genre}</p>
            <p className="text-lg"><strong className="text-purple-300">Rated:</strong> {movie.Rated}</p>
            <p className="text-lg"><strong className="text-purple-300">Released:</strong> {movie.Released}</p>
            <p className="text-lg"><strong className="text-purple-300">Runtime:</strong> {movie.Runtime}</p>
            <p className="text-lg"><strong className="text-purple-300">Director:</strong> {movie.Director}</p>
            <p className="text-lg"><strong className="text-purple-300">Writer:</strong> {movie.Writer}</p>
            <p className="text-lg"><strong className="text-purple-300">Actors:</strong> {movie.Actors}</p>
            <p className="text-lg"><strong className="text-purple-300">Language:</strong> {movie.Language}</p>
            <p className="text-lg"><strong className="text-purple-300">Country:</strong> {movie.Country}</p>
            <p className="text-lg"><strong className="text-purple-300">Awards:</strong> {movie.Awards}</p>
            <p className="text-lg"><strong className="text-purple-300">IMDb Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)</p>
            
            {movie.Plot && (
              <>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mt-6 mb-2">Plot:</h2>
                <p className="text-lg leading-relaxed text-gray-200">{movie.Plot}</p>
              </>
            )}

            {movie.Ratings && movie.Ratings.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mt-6 mb-2">Ratings:</h2>
                <ul className="list-disc list-inside space-y-1 text-lg text-gray-200">
                  {movie.Ratings.map((rating, index) => (
                    <li key={index}><strong className="text-blue-300">{rating.Source}:</strong> {rating.Value}</li>
                  ))}
                  {movie.Metascore !== 'N/A' && <li><strong className="text-blue-300">Metascore:</strong> {movie.Metascore}</li>}
                </ul>
              </>
            )}

            {/* Optional: Add a back button */}
            <div className="mt-8 text-center md:text-left">
              <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 transform hover:scale-105">
                ← Back to Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
