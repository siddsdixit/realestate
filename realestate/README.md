# Real Estate Investment App

## Project Context

A web application that empowers real estate investors to efficiently identify promising investment properties by providing MLS listings filtered by investor-specific criteria and offering tools for financial analysis.

## Tech Stack

*   **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
*   **Backend**: Python, FastAPI, MongoDB Atlas

## Instructions for Running the App

### Frontend

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`
4.  Open your browser and visit `http://localhost:3000`

### Backend

1.  Navigate to the `backend` directory: `cd backend`
2.  Create a virtual environment: `python3 -m venv venv`
3.  Activate the virtual environment: `source venv/bin/activate`
4.  Install dependencies: `pip install -r requirements.txt`
5.  Run the development server: `uvicorn main:app --reload`
6.  Open your browser and visit `http://localhost:8000/docs` to view the API documentation