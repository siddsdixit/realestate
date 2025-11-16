"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Property {
  _id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_footage?: number;
  property_type: string;
  photos: string[];
}

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    zip_code: '',
    min_price: '',
    max_price: '',
    bedrooms: '',
    bathrooms: '',
    property_type: '',
  });
  const [resultsCount, setResultsCount] = useState(0);

  const searchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchParams.zip_code) params.append('zip_code', searchParams.zip_code);
      if (searchParams.min_price) params.append('min_price', searchParams.min_price);
      if (searchParams.max_price) params.append('max_price', searchParams.max_price);
      if (searchParams.bedrooms) params.append('bedrooms', searchParams.bedrooms);
      if (searchParams.bathrooms) params.append('bathrooms', searchParams.bathrooms);
      if (searchParams.property_type) params.append('property_type', searchParams.property_type);

      try {
        const response = await fetch(`http://localhost:8000/api/v1/properties?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setProperties(data.properties || []);
          setResultsCount(data.total || 0);
          return;
        }
      } catch (fetchError) {
        console.log('Backend not available, using mock data');
      }

      // Fallback to mock data
      const { searchMockProperties } = await import('@/lib/mockData');
      const mockParams = {
        zip_code: searchParams.zip_code || undefined,
        min_price: searchParams.min_price ? parseFloat(searchParams.min_price) : undefined,
        max_price: searchParams.max_price ? parseFloat(searchParams.max_price) : undefined,
        bedrooms: searchParams.bedrooms ? parseInt(searchParams.bedrooms) : undefined,
        bathrooms: searchParams.bathrooms ? parseFloat(searchParams.bathrooms) : undefined,
        property_type: searchParams.property_type || undefined,
      };
      const data = await searchMockProperties(mockParams);
      setProperties(data.properties || []);
      setResultsCount(data.total || 0);
    } catch (error) {
      console.error('Error searching properties:', error);
      setProperties([]);
      setResultsCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProperties();
  };

  // Load initial properties on mount
  useEffect(() => {
    searchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Property Search</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Find Your Perfect Investment</h2>
              <p className="text-gray-600 dark:text-gray-300">Use our advanced filters to discover properties that match your criteria</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="zip_code" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip_code"
                  value={searchParams.zip_code}
                  onChange={(e) => setSearchParams({ ...searchParams, zip_code: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                  placeholder="e.g., 10001"
                  maxLength={5}
                />
              </div>
              
              <div>
                <label htmlFor="min_price" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  id="min_price"
                  value={searchParams.min_price}
                  onChange={(e) => setSearchParams({ ...searchParams, min_price: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                  placeholder="100,000"
                />
              </div>
              
              <div>
                <label htmlFor="max_price" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  id="max_price"
                  value={searchParams.max_price}
                  onChange={(e) => setSearchParams({ ...searchParams, max_price: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                  placeholder="500,000"
                />
              </div>
              
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  value={searchParams.bedrooms}
                  onChange={(e) => setSearchParams({ ...searchParams, bedrooms: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Bathrooms
                </label>
                <select
                  id="bathrooms"
                  value={searchParams.bathrooms}
                  onChange={(e) => setSearchParams({ ...searchParams, bathrooms: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="1.5">1.5+</option>
                  <option value="2">2+</option>
                  <option value="2.5">2.5+</option>
                  <option value="3">3+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="property_type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Property Type
                </label>
                <select
                  id="property_type"
                  value={searchParams.property_type}
                  onChange={(e) => setSearchParams({ ...searchParams, property_type: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                >
                  <option value="">All Types</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Multi-Family">Multi-Family</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    Search Properties
                  </>
                )}
              </button>
              {resultsCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-primary">{resultsCount}</span> properties found
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading properties...</p>
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-200 dark:border-gray-700">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">No properties found</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria to find more results.
            </p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Properties ({resultsCount})
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Link
                  key={property._id}
                  href={`/properties/${property._id}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {property.photos && property.photos.length > 0 ? (
                      <img
                        src={property.photos[0]}
                        alt={property.address}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                        {property.property_type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {formatPrice(property.price)}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 line-clamp-1">
                      {property.address}, {property.city}, {property.state} {property.zip_code}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15V18m-7.5-6v9m0-9.75h7.5m-7.5 0h7.5m-7.5 0V9.375c0-.621.504-1.125 1.125-1.125h6c.621 0 1.125.504 1.125 1.125v3.75m-9 0h9" />
                        </svg>
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                      {property.square_footage && (
                        <div className="flex items-center gap-1">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15m-16.5 18V9.75m0 0V6.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v3.375m-9 0h9" />
                          </svg>
                          <span className="font-medium">{property.square_footage.toLocaleString()} sqft</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
