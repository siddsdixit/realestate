from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import Optional
import os
from models import Property, PropertySearchParams
from bson import ObjectId
from datetime import datetime

load_dotenv()

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")

# Lazy connection - only connect when needed
client = None
db = None
properties_collection = None

def get_db():
    global client, db, properties_collection
    if client is None and DATABASE_URL:
        try:
            client = MongoClient(DATABASE_URL)
            db = client.get_default_database()
            properties_collection = db.properties
        except Exception as e:
            print(f"Warning: Could not connect to MongoDB: {e}")
            return None
    return db


@app.get("/api/v1/health")
async def health_check():
    try:
        db = get_db()
        if db is None:
            return {"status": "ok", "database": "not_configured"}
        client.admin.command('ping')
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "ok", "database": "error", "error": str(e)}


@app.get("/api/v1/properties")
async def search_properties(
    zip_code: Optional[str] = Query(None, min_length=5, max_length=5),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    bedrooms: Optional[int] = Query(None, ge=0),
    bathrooms: Optional[float] = Query(None, ge=0),
    property_type: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=100),
    skip: int = Query(0, ge=0)
):
    """Search for properties based on various criteria"""
    query = {}
    
    if zip_code:
        query["zip_code"] = zip_code
    
    if min_price is not None or max_price is not None:
        price_query = {}
        if min_price is not None:
            price_query["$gte"] = min_price
        if max_price is not None:
            price_query["$lte"] = max_price
        query["price"] = price_query
    
    if bedrooms is not None:
        query["bedrooms"] = bedrooms
    
    if bathrooms is not None:
        query["bathrooms"] = bathrooms
    
    if property_type:
        query["property_type"] = property_type
    
    try:
        db = get_db()
        if db is None or properties_collection is None:
            # Return empty if database not configured
            return {
                "properties": [],
                "total": 0,
                "limit": limit,
                "skip": skip
            }
        
        cursor = properties_collection.find(query).skip(skip).limit(limit)
        properties = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            properties.append(doc)
        
        total = properties_collection.count_documents(query)
        
        return {
            "properties": properties,
            "total": total,
            "limit": limit,
            "skip": skip
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/v1/properties/{property_id}")
async def get_property(property_id: str):
    """Get detailed information about a specific property"""
    try:
        db = get_db()
        if db is None or properties_collection is None:
            raise HTTPException(status_code=503, detail="Database not configured")
        
        if not ObjectId.is_valid(property_id):
            raise HTTPException(status_code=400, detail="Invalid property ID")
        
        property_doc = properties_collection.find_one({"_id": ObjectId(property_id)})
        
        if not property_doc:
            raise HTTPException(status_code=404, detail="Property not found")
        
        property_doc["_id"] = str(property_doc["_id"])
        return property_doc
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/v1/seed")
async def seed_properties(count: int = 50):
    """Seed the database with synthetic property data (for development/testing)"""
    import random
    
    property_types = ["Single Family", "Condo", "Townhouse", "Multi-Family"]
    cities_states = [
        ("New York", "NY", "10001"),
        ("Los Angeles", "CA", "90001"),
        ("Chicago", "IL", "60601"),
        ("Houston", "TX", "77001"),
        ("Phoenix", "AZ", "85001"),
        ("Philadelphia", "PA", "19101"),
        ("San Antonio", "TX", "78201"),
        ("San Diego", "CA", "92101"),
        ("Dallas", "TX", "75201"),
        ("San Jose", "CA", "95101"),
    ]
    street_names = [
        "Main St", "Oak Ave", "Elm St", "Park Ave", "Maple Dr",
        "Cedar Ln", "Pine St", "Washington Ave", "Lincoln Blvd", "Jefferson St",
    ]
    
    properties = []
    for _ in range(count):
        city, state, zip_code = random.choice(cities_states)
        street_num = random.randint(100, 9999)
        street = random.choice(street_names)
        address = f"{street_num} {street}"
        
        bedrooms = random.choice([1, 2, 3, 4, 5])
        bathrooms = round(random.uniform(1, bedrooms + 1), 1)
        if bathrooms > bedrooms:
            bathrooms = bedrooms
        
        base_price = random.randint(150000, 800000)
        price = round(base_price + (bedrooms * 50000) + random.randint(-20000, 20000), -2)
        
        square_footage = random.randint(800, 4000)
        lot_size = round(square_footage * random.uniform(1.2, 3.0), 0)
        year_built = random.randint(1950, 2023)
        
        # Use realistic property images from Unsplash
        property_image_sets = [
            [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
            ],
            [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
            ],
            [
                "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
            ],
        ]
        image_set = random.choice(property_image_sets)
        num_photos = min(len(image_set), random.randint(2, 3))
        photos = image_set[:num_photos]
        
        latitude = round(random.uniform(25.0, 45.0), 6)
        longitude = round(random.uniform(-125.0, -70.0), 6)
        
        descriptions = [
            f"Beautiful {property_types[0].lower()} property in {city}. Perfect for investors.",
            f"Spacious {bedrooms}-bedroom property with modern amenities.",
            f"Investment opportunity in {city}. Excellent potential for rental income.",
        ]
        
        properties.append({
            "address": address,
            "city": city,
            "state": state,
            "zip_code": zip_code,
            "price": price,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "square_footage": square_footage,
            "lot_size": lot_size,
            "year_built": year_built,
            "property_type": random.choice(property_types),
            "description": random.choice(descriptions),
            "photos": photos,
            "latitude": latitude,
            "longitude": longitude,
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
        })
    
    try:
        db = get_db()
        if db is None or properties_collection is None:
            raise HTTPException(status_code=503, detail="Database not configured. Please set DATABASE_URL in .env file")
        
        result = properties_collection.insert_many(properties)
        total = properties_collection.count_documents({})
        return {
            "message": f"Successfully seeded {len(result.inserted_ids)} properties",
            "total_properties": total,
            "inserted_count": len(result.inserted_ids)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
