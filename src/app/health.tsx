"use client"
import { useState, useEffect } from 'react';

export default function HealthCheck() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      // Try Next.js API route (works in production)
      try {
        const response = await fetch('/api/v1/health');
        const data = await response.json();
        setStatus(data.status || 'ok');
      } catch (error) {
        setStatus('Using mock data');
      }
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