"""
Simple seed script that only requires pymongo
"""
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import random
from datetime import datetime

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("❌ DATABASE_URL not found in environment variables")
    print("Please create a .env file with DATABASE_URL=your_mongodb_connection_string")
    exit(1)

try:
    client = MongoClient(DATABASE_URL)
    db = client.get_default_database()
    properties_collection = db.properties
    
    # Test connection
    client.admin.command('ping')
    print("✅ Connected to MongoDB successfully!")
    
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
        "Madison Ave", "Adams St", "Jackson St", "Monroe St", "Harrison Ave"
    ]
    
    num_properties = 50
    print(f"Generating {num_properties} synthetic properties...")
    
    properties = []
    for i in range(num_properties):
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
        
        num_photos = random.randint(1, 3)
        # Using placeholder images
        photos = [
            f"https://images.unsplash.com/photo-{random.randint(1500000000000, 1700000000000)}?w=800&h=600&fit=crop"
            for _ in range(num_photos)
        ]
        
        latitude = round(random.uniform(25.0, 45.0), 6)
        longitude = round(random.uniform(-125.0, -70.0), 6)
        
        descriptions = [
            f"Beautiful {property_types[0].lower()} property in {city}. Perfect for investors looking for a great opportunity.",
            f"Spacious {bedrooms}-bedroom property with modern amenities. Located in a desirable neighborhood.",
            f"Investment opportunity in {city}. This property offers excellent potential for rental income.",
            f"Charming property with {bedrooms} bedrooms and {int(bathrooms)} bathrooms. Great location!",
            f"Prime real estate investment in {city}. Property features include updated kitchen and bathrooms.",
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
        
        if (i + 1) % 10 == 0:
            print(f"  Generated {i + 1}/{num_properties} properties...")
    
    # Insert properties
    print(f"\nInserting properties into database...")
    result = properties_collection.insert_many(properties)
    
    total = properties_collection.count_documents({})
    print(f"\n✅ Successfully inserted {len(result.inserted_ids)} properties!")
    print(f"📊 Total properties in database: {total}")
    
    # Print statistics
    zip_counts = {}
    for prop in properties:
        zip_code = prop["zip_code"]
        zip_counts[zip_code] = zip_counts.get(zip_code, 0) + 1
    
    print("\n📍 Properties by zip code:")
    for zip_code, count in sorted(zip_counts.items()):
        print(f"   {zip_code}: {count} properties")
    
    print("\n✨ Database seeding completed!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()

