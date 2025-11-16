"use client"
import { useState, useEffect } from 'react';

export default function HealthCheck() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      // Only try backend if API URL is explicitly set (not relative URL)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl && !apiUrl.startsWith('/')) {
        try {
          const response = await fetch(`${apiUrl}/health`);
          const data = await response.json();
          setStatus(data.status);
          return;
        } catch (error) {
          setStatus('Backend not available');
          return;
        }
      }
      // No backend configured, show status
      setStatus('Using mock data (backend not configured)');
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Health Check</h1>
      <p>Status: {status}</p>
    </div>
  );
}