from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class Property(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )
    
    id: Optional[str] = Field(None, alias="_id")
    address: str
    city: str
    state: str
    zip_code: str = Field(..., min_length=5, max_length=5)
    price: float
    bedrooms: int
    bathrooms: float
    square_footage: Optional[int] = None
    lot_size: Optional[float] = None
    year_built: Optional[int] = None
    property_type: str = "Single Family"
    description: Optional[str] = None
    photos: List[str] = []
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class PropertySearchParams(BaseModel):
    zip_code: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[float] = None
    property_type: Optional[str] = None
    limit: int = 50
    skip: int = 0
