import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
const Base_url = import.meta.env.VITE_BASE_URL

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const query = useQuery();
  const searchTerm = query.get('title');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${Base_url}/media/search?title=${encodeURIComponent(searchTerm)}`);
        setResults(data.data);
      } catch (err) {
        setError('Failed to load search results.');
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-emerald-600 mb-4">
        Search Results for: "{searchTerm}"
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && results?.length === 0 && (
        <p className="text-gray-600">No media found for this title.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results?.map((media) => (
          <Link
            key={media._id}
            to={`/media/${media._id}`}
            className="border border-emerald-100 rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <img
              src={media.image || '/placeholder.jpg'}
              alt={media.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">{media.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{media.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
