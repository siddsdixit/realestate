import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if backend URL is configured
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (backendUrl && !backendUrl.startsWith('/')) {
      const response = await fetch(`${backendUrl}/health`);
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }
    
    // Return mock health status
    return NextResponse.json({
      status: 'ok',
      database: 'not_configured',
      message: 'Using mock data'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'ok',
      database: 'not_configured',
      message: 'Using mock data'
    });
  }
}

