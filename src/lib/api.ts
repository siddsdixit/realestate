// API configuration
const getApiUrl = () => {
  // Use environment variable if set, otherwise use relative URL or localhost for development
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL or environment variable
    return process.env.NEXT_PUBLIC_API_URL || '/api/v1';
  }
  // Server-side: use environment variable or default
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
};

export const API_BASE_URL = getApiUrl();

