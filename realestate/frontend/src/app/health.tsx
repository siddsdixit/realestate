"use client"
import { useState, useEffect } from 'react';

export default function HealthCheck() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/health');
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