import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;
    
    // Check if backend URL is configured
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (backendUrl && !backendUrl.startsWith('/')) {
      const response = await fetch(`${backendUrl}/properties/${propertyId}`);
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }
    
    // Fallback to mock data
    const { getMockProperty } = await import('@/lib/mockData');
    const mockProperty = await getMockProperty(propertyId);
    
    if (mockProperty) {
      return NextResponse.json(mockProperty);
    }
    
    return NextResponse.json(
      { error: 'Property not found' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

