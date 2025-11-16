import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check if backend URL is configured
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (backendUrl && !backendUrl.startsWith('/')) {
      const queryString = searchParams.toString();
      const response = await fetch(`${backendUrl}/properties?${queryString}`);
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }
    
    // Fallback to mock data
    const { searchMockProperties } = await import('@/lib/mockData');
    const mockParams = {
      zip_code: searchParams.get('zip_code') || undefined,
      min_price: searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')!) : undefined,
      max_price: searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')!) : undefined,
      bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined,
      bathrooms: searchParams.get('bathrooms') ? parseFloat(searchParams.get('bathrooms')!) : undefined,
      property_type: searchParams.get('property_type') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
      skip: searchParams.get('skip') ? parseInt(searchParams.get('skip')!) : 0,
    };
    
    const data = await searchMockProperties(mockParams);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { properties: [], total: 0, limit: 50, skip: 0 },
      { status: 500 }
    );
  }
}

