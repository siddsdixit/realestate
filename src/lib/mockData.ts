// Mock property data for frontend development
export interface Property {
  _id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_footage?: number;
  lot_size?: number;
  year_built?: number;
  property_type: string;
  description?: string;
  photos: string[];
  latitude?: number;
  longitude?: number;
}

// Realistic property images from Unsplash
const propertyImageSets = [
  // Modern homes
  [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
  ],
  // Luxury homes
  [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  ],
  // Suburban homes
  [
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  ],
  // Contemporary homes
  [
    "https://images.unsplash.com/photo-1600607688969-a5d11f0b6e1b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
  ],
  // Traditional homes
  [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
  ],
  // Condos/Townhouses
  [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
  ],
];

// Generate synthetic properties
function generateMockProperties(count: number = 50): Property[] {
  const propertyTypes = ["Single Family", "Condo", "Townhouse", "Multi-Family"];
  const citiesStates = [
    { city: "New York", state: "NY", zip: "10001" },
    { city: "Los Angeles", state: "CA", zip: "90001" },
    { city: "Chicago", state: "IL", zip: "60601" },
    { city: "Houston", state: "TX", zip: "77001" },
    { city: "Phoenix", state: "AZ", zip: "85001" },
    { city: "Philadelphia", state: "PA", zip: "19101" },
    { city: "San Antonio", state: "TX", zip: "78201" },
    { city: "San Diego", state: "CA", zip: "92101" },
    { city: "Dallas", state: "TX", zip: "75201" },
    { city: "San Jose", state: "CA", zip: "95101" },
  ];
  
  const streetNames = [
    "Main St", "Oak Ave", "Elm St", "Park Ave", "Maple Dr",
    "Cedar Ln", "Pine St", "Washington Ave", "Lincoln Blvd", "Jefferson St",
    "Madison Ave", "Adams St", "Jackson St", "Monroe St", "Harrison Ave"
  ];

  const descriptions = [
    "Stunning property with modern finishes and exceptional attention to detail. Perfect for investors seeking premium returns.",
    "Spacious and well-maintained property featuring updated amenities and prime location. Excellent rental potential.",
    "Investment opportunity with strong cash flow potential. Property features include updated kitchen, bathrooms, and HVAC.",
    "Charming property in desirable neighborhood with great schools and amenities nearby. Turnkey investment ready.",
    "Prime real estate investment with excellent appreciation potential. Property is move-in ready and well-maintained.",
    "Beautiful home with open floor plan, high ceilings, and natural light throughout. Great for families or investors.",
    "Well-positioned property offering strong rental yields. Features include updated systems and modern finishes.",
  ];

  const properties: Property[] = [];

  for (let i = 0; i < count; i++) {
    const location = citiesStates[Math.floor(Math.random() * citiesStates.length)];
    const streetNum = Math.floor(Math.random() * 9000) + 100;
    const street = streetNames[Math.floor(Math.random() * streetNames.length)];
    const address = `${streetNum} ${street}`;
    
    const bedrooms = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)];
    const bathrooms = Math.round((Math.random() * bedrooms + 1) * 10) / 10;
    
    const basePrice = Math.floor(Math.random() * 650000) + 150000;
    const price = Math.round(basePrice + (bedrooms * 50000) + (Math.random() * 40000 - 20000));
    
    const squareFootage = Math.floor(Math.random() * 3200) + 800;
    const lotSize = Math.round(squareFootage * (Math.random() * 1.8 + 1.2));
    const yearBuilt = Math.floor(Math.random() * 73) + 1950;
    
    // Use realistic property images
    const imageSet = propertyImageSets[Math.floor(Math.random() * propertyImageSets.length)];
    const numPhotos = Math.min(imageSet.length, Math.floor(Math.random() * 3) + 2);
    const photos = imageSet.slice(0, numPhotos);
    
    const latitude = Math.round((Math.random() * 20 + 25) * 1000000) / 1000000;
    const longitude = Math.round((Math.random() * 55 - 125) * 1000000) / 1000000;
    
    properties.push({
      _id: `mock_${i}_${Date.now()}`,
      address,
      city: location.city,
      state: location.state,
      zip_code: location.zip,
      price,
      bedrooms,
      bathrooms,
      square_footage: squareFootage,
      lot_size: lotSize,
      year_built: yearBuilt,
      property_type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)] + ` Located in ${location.city}.`,
      photos,
      latitude,
      longitude,
    });
  }

  return properties;
}

export const mockProperties = generateMockProperties(50);

// Mock API functions for development
export async function searchMockProperties(params: {
  zip_code?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  property_type?: string;
  limit?: number;
  skip?: number;
}): Promise<{ properties: Property[]; total: number; limit: number; skip: number }> {
  let filtered = [...mockProperties];

  if (params.zip_code) {
    filtered = filtered.filter(p => p.zip_code === params.zip_code);
  }
  if (params.min_price !== undefined) {
    filtered = filtered.filter(p => p.price >= params.min_price!);
  }
  if (params.max_price !== undefined) {
    filtered = filtered.filter(p => p.price <= params.max_price!);
  }
  if (params.bedrooms !== undefined) {
    filtered = filtered.filter(p => p.bedrooms === params.bedrooms);
  }
  if (params.bathrooms !== undefined) {
    filtered = filtered.filter(p => p.bathrooms === params.bathrooms);
  }
  if (params.property_type) {
    filtered = filtered.filter(p => p.property_type === params.property_type);
  }

  const total = filtered.length;
  const skip = params.skip || 0;
  const limit = params.limit || 50;
  const properties = filtered.slice(skip, skip + limit);

  return { properties, total, limit, skip };
}

export async function getMockProperty(id: string): Promise<Property | null> {
  return mockProperties.find(p => p._id === id) || null;
}
