"use client"

import { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { ReadContext } from './ReadContext';

const SearchResults = () => {
  // const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { query } = useContext(ReadContext);
  
  const API_KEY = process.env.GOOGLE_API;
  const SEARCH_ENGINE_ID = process.env.ID_MOTEUR_RECHERCHE;

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/googleSearch", {
        query: query.trim()
      });
      
      setResults(data.results || []);

    } catch (err) {
      setError('Failed to fetch search results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    ()=>{
      const handleSearch = async () => {
        if (!query) return;
    
        setLoading(true);
        setError(null);
    
        try {
          const { data } = await axios.post("/api/googleSearch", {
            query: query.trim()
          });
          
          setResults(data.results || []);
    
        } catch (err) {
          setError('Failed to fetch search results');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      handleSearch();

    },[query]
  )

  return (
   <div>
    {
      query && (
        <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex gap-4">
            {/* <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search query..."
              className="flex-1 p-2 border rounded"
            /> */}
            {/* <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Searching...' : 'Search'}
            </button> */}
          </div>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.link} className="border-b pb-4">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-lg"
                >
                  {result.title}
                </a>
                <p className="text-green-700 text-sm">{result.link}</p>
                <p className="text-gray-600 mt-1">{result.snippet}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )
    }
   </div>
  );
};

export default SearchResults;