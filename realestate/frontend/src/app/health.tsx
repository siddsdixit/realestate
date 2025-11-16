"use client"
import { useState, useEffect } from 'react';

export default function HealthCheck() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
        const response = await fetch(`${apiUrl}/health`);
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        setStatus('Error');
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