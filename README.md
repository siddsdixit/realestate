# Real Estate Investment Platform

A Next.js web application that empowers real estate investors to efficiently identify promising investment properties by providing MLS listings filtered by investor-specific criteria and tools for financial analysis.

## Tech Stack

**Frontend:**
- Next.js 16.x (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

**Backend:**
- Python 3.12
- FastAPI
- MongoDB Atlas

## Project Structure

```
/
├── src/                    # Next.js frontend application
│   ├── app/               # App Router pages and API routes
│   │   ├── api/          # Next.js API routes (backend functionality)
│   │   ├── dashboard/    # Property dashboard
│   │   ├── properties/   # Property detail pages
│   │   └── page.tsx      # Landing page
│   └── lib/              # Utilities and mock data
├── backend/               # FastAPI backend (optional, for external deployment)
│   ├── main.py           # FastAPI app
│   ├── models.py         # Pydantic models
│   └── requirements.txt  # Python dependencies
├── public/               # Static assets
└── vercel.json           # Vercel deployment config

```

## Getting Started

### Frontend Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Backend Development (Optional)

The frontend includes Next.js API routes that work out of the box with mock data. For external backend deployment:

1. Navigate to backend:
```bash
cd backend
```

2. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
DATABASE_URL=your_mongodb_connection_string
```

5. Run the backend:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Features

- **Property Search**: Filter properties by price, bedrooms, bathrooms, zip code, and property type
- **Property Details**: View comprehensive property information with image galleries
- **Mock Data**: 50 synthetic properties for development and testing
- **API Routes**: Built-in Next.js API routes (`/api/v1/*`)
- **Responsive Design**: Modern glass morphism UI with mobile support
- **Real-time Updates**: Live property search with instant results

## API Endpoints

### Next.js API Routes (Built-in)

- `GET /api/v1/health` - Health check
- `GET /api/v1/properties` - Search properties with filters
- `GET /api/v1/properties/[id]` - Get property details

### Query Parameters for Property Search

- `zip_code` - Filter by ZIP code
- `min_price` - Minimum price
- `max_price` - Maximum price
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `property_type` - Property type (e.g., "Single Family", "Condo")
- `limit` - Results per page (default: 50)
- `skip` - Results to skip for pagination

## Deployment

### Vercel (Frontend + API Routes)

The app is configured for automatic Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with default settings
4. All API routes work automatically

### Environment Variables

For connecting to an external backend:

- `BACKEND_URL` - External backend API URL (optional)

## Development Plan

See `development-plan.md` for the complete sprint-based development strategy.

## License

Private project.
