# Development Plan

## 1. Foundational Strategy & Technology Choices

### 1.1. Architectural Pattern Decision

**Decision**: Modular Monolith. The PRD does not present any explicit and compelling technical drivers to justify a microservices architecture. A modular monolith will accelerate development velocity and minimize operational overhead.

---
### 1.2. Technology Stack Selection

*ENSURE ALL SPECIFIED VERSIONS ARE THE LATEST STABLE RELEASES.*

The technology stack is selected for developer experience, ecosystem maturity, and performance.

#### Frontend Framework & UI:
* **Framework**: Next.js
    * **Version**: Latest stable version (e.g., ~15.x)
    * **Rationale**: Next.js offers a premier React framework with a robust feature set including the App Router, which provides a modern, powerful approach to building layouts and fetching data.
* **UI Components**: shadcn/ui
    * **Version**: Latest version (e.g., ~0.9.x)
    * **Rationale**: shadcn/ui provides a set of unstyled, accessible components that are composed to build a custom UI. This avoids framework lock-in and allows for maximum design flexibility.

#### Backend Runtime & Framework:
* **Runtime**: Python
    * **Version**: Latest stable LTS version (e.g., ~3.12)
    * **Rationale**: Python is a mature, highly readable language with a vast ecosystem of libraries, making it an ideal choice for building robust and maintainable backend services quickly.
* **Framework**: FastAPI
    * **Version**: Latest version (e.g., ~0.116.x)
    * **Rationale**: FastAPI stands out for its incredible performance and developer-friendly features. Its built-in data validation with Pydantic and auto-generated API docs drastically reduce boilerplate code and accelerate the development cycle.

#### Primary Database:
* **Database**: MongoDB Atlas (Free Tier)
    * **Rationale**: MongoDB's document-based model offers exceptional flexibility, which is perfect for agile projects where schemas may evolve. It aligns seamlessly with the object-oriented nature of both our Python backend and JavaScript frontend, and the Atlas free tier is sufficient for development.

---
### 1.3. Core Infrastructure & Services (Local Development Focus)

Define the supporting services needed for an efficient local development loop. The primary goal is to eliminate unnecessary complexity and friction.

* **Local Development**: The project will be run with simple command-line instructions: `npm run dev` for the frontend and `uvicorn main:app --reload` for the backend. No containerization (e.g., Docker) is required.
* **File Storage**: For any file uploads specified in the PRD, a simple local filesystem approach will be used via a git-ignored `./uploads` directory in the backend project.
* **Authentication**: A standard, library-based JWT (JSON Web Tokens) approach will be implemented. This is a secure and stateless method perfect for a monolithic API architecture.
* **External Services**: Enumerate any third-party APIs essential to the project (e.g., Stripe, SendGrid, OpenAI).

---
### 1.4. Integration and API Strategy

* **API Style**: A versioned REST API (e.g., `/api/v1/...`) will be used for all communication between the frontend and backend.
* **Standard Formats**: All API responses will adhere to a consistent JSON structure for success and error states.

---
### 1.5. Deployment Infrastructure

Define the deployment strategy for both frontend and backend throughout the development process.

* **Frontend Deployment (Vercel)**:
  - Connect GitHub repository to Vercel
  - Enable automatic deployments from sprint branches
  - Each sprint branch will get its own preview URL
  - Environment variables: Configure in Vercel dashboard
  - Custom domain (optional): Configure after merging to main

* **Backend Deployment (Render)**:
  - Connect GitHub repository to Render
  - Create web service with automatic deploys
  - Configure branch deploys for sprint branches
  - Environment variables: Set in Render dashboard (DATABASE_URL, JWT_SECRET, etc.)
  - Ensure MongoDB Atlas allows connections from Render IPs

* **Deployment Testing**:
  - Each sprint must be tested on deployed infrastructure before PR approval
  - Frontend and backend must communicate correctly in deployed environment
  - All environment-specific issues must be resolved before merging to main

---
## Phase 2: Application Anatomy & Design

Deconstruct the application into logical, domain-driven modules based on the PRD's features.

### 2.1. Module Identification

* **Domain Modules**: (e.g., AuthModule, PropertyModule)
* **Shared Module**: (e.g., for common UI components, hooks, and type definitions)

### 2.2. Module Responsibilities and Interfaces

* **Responsibilities**: Define what each module owns (e.g., "The AuthModule is responsible for user registration, login, and session management. It controls the `users` collection and all related API endpoints.").
* **Interface**: Define how modules interact (e.g., "The PropertyModule exposes functions for other modules to use.").

### 2.3. Core Module Design

* **Folder Structure**: Propose a feature-based folder structure for the frontend and a logical structure for the backend (e.g., `/routers`, `/services`, `/models`).
* **Key Patterns**: Mention the use of the Repository Pattern for data access logic and a Service Layer for business logic.

---
## Phase 3: Incremental Delivery Plan

Create a granular, sprint-based development plan. Deferred features are ignored. Each sprint must be described as a self-contained unit of work.

#### Special Instructions for Sprints:
* **Task Checkpoints**: All tasks within a sprint must be formatted as a Markdown checklist item (e.g., `- **Task Name**:`). Tasks should be marked as complete after the user has manually tested and confirmed the functionality is working correctly.
* **Interactive Task Execution**: For every task, the developer will:
   1.  Implement the task.
   2.  Notify the user to perform manual testing.
   3.  Await user confirmation that the functionality works correctly.
   4.  Proceed to the next task only after receiving confirmation.
* **Version Control & Branch Strategy**: Each sprint will be developed on its own feature branch. The workflow is:
   1. Create a new branch for the sprint (e.g., `sprint-0`, `sprint-1`, `sprint-2`)
   2. Implement all tasks on this branch
   3. Test locally and create detailed commit with accomplishments list
   4. Push the branch to GitHub
   5. Deploy frontend to Vercel and backend to Render from the sprint branch using Infra Architect mode
   6. Create a Pull Request (PR) against the `main` branch
   7. After PR review and approval, merge to main


* **README Maintenance**: The root `README.md` will be created in Sprint 0 and continuously updated with setup instructions and project status as new features are added.
* **IMPORTANT: This Mode is for Planning Only**: You are creating a development plan document. Do NOT request user input during planning. User input (GitHub URL, MongoDB URL, etc.) will be requested later when the plan is executed.
* **CRITICAL: User Input Requirements During Execution**: When executing the development plan (not during planning), you MUST explicitly request specific information from the user when needed. This includes:
  - **GitHub Repository URL**: Required for Sprint 0, Task 1 - Repository Synchronization
  - **MongoDB Atlas Connection String**: Required for Sprint 0, Task 2 - Environment Configuration
  - **API Keys**: Any third-party service keys (Stripe, SendGrid, etc.) as specified in the PRD
  - **Theme Colors**: Primary and secondary hex color codes for UI theming
  - **Domain/Environment Details**: Production URLs, staging environments, etc.
  - **Business Logic Clarifications**: Any ambiguous requirements that need user input
  - **Testing Confirmations**: User must manually test and confirm each feature works before proceeding
* **User Input Protocol**: When requesting user input, you must:
  1. Clearly explain WHY this information is needed for the current task
  2. Specify exactly WHAT format/type of information is required
  3. Provide examples or guidance if helpful
  4. Wait for user response before proceeding with the task
  5. Document the provided information in the appropriate configuration files

---
### THE SPRINT PLAN

#### Sprint 0: Groundwork & Scaffolding
* **Sprint ID**: S0: Groundwork & Scaffolding
* **Project Context**: A web application that empowers real estate investors to efficiently identify promising investment properties by providing MLS listings filtered by investor-specific criteria and offering tools for financial analysis.
* **Goal**: To establish a fully configured, runnable project with a frontend and backend that can communicate, connect to the database, and are ready for feature development.
* **Tasks**:
  - [x] **1. Repository Synchronization**:
      * **USER INPUT REQUIRED**: Ask the user for the URL of their new, empty GitHub repository.
      * **WHY**: This is needed to set up version control and push the initial project structure.
      * **FORMAT**: Provide the full GitHub repository URL (e.g., `https://github.com/username/project-name.git`)
      * **ACTION**: Clone the repository locally and set up the initial project structure.
  - **2. Environment Configuration**: 
      * **USER INPUT REQUIRED**: Ask the user for their MongoDB Atlas connection string and any other required API keys. Ask for primary and secondary theme colors (hex codes).
      * **WHY**: MongoDB connection is needed for database setup, API keys for third-party integrations, and theme colors for UI customization.
      * **FORMAT**: 
        - MongoDB: `mongodb+srv://username:password@cluster.mongodb.net/database`
        - API Keys: As provided by the service (Stripe, SendGrid, etc.)
        - Theme Colors: Hex codes (e.g., `#3B82F6` for primary, `#1E40AF` for secondary)
      * **ACTION**: Create `.env.example` and `.env` files with the provided configuration.
  - [x] **3. Project Structure**: Create a root directory with `frontend` and `backend` subdirectories. Initialize Git and create a root `.gitignore`.
  - [x] **4. Backend Setup (Python/FastAPI)**: Set up a Python virtual environment in `/backend`. Install `fastapi`, `uvicorn`, `pydantic`, `python-dotenv`, and other core dependencies into `requirements.txt`. Create `.env.example` and `.env` files, populating the latter with the `DATABASE_URL`.
  - [x] **5. Frontend Setup (Next.js)**: Scaffold a new Next.js app in `/frontend`. Initialize shadcn/ui and configure `tailwind.config.js` with the user-provided theme colors.
  - [x] **6. Documentation**: Create a root `README.md` with the project context, tech stack, and instructions for running both frontend and backend servers.
  - [x] **7. "Health Check" Verification**:
      * **Backend**: Create a `/api/v1/health` endpoint that connects to MongoDB and returns `{"status": "ok"}`.
      * **Frontend**: Create a page that fetches from the backend health endpoint and displays the status.
      * **USER INPUT REQUIRED**: Ask the user to run both services, open the browser, and confirm they see "Status: ok" and that the backend terminal shows a successful database connection.
      * **WHY**: This confirms the entire setup is working correctly before proceeding to feature development.
  - **8. Sprint Branch, Commit & Deployment**: After user confirmation, create sprint branch, commit, deploy, and create PR.
      * Create a new branch: `git checkout -b sprint-0`
      * Stage all files: `git add .`
      * Confirm with the user before committing
      * **Commit Format**:
        ```
        chore(sprint-0): initial project setup and scaffolding
        
        Sprint 0 Accomplishments:
        - Set up Next.js frontend with shadcn/ui and Tailwind CSS
        - Configured FastAPI backend with Python virtual environment
        - Integrated MongoDB Atlas database connection
        - Created environment configuration with .env files
        - Implemented health check endpoint and verification page
        - Added comprehensive README with setup instructions
        - Established version control with Git and GitHub
        ```
      * Push branch: `git push origin sprint-0`
      * **Deploy Frontend to Vercel**:
        - Connect the repository to Vercel (if first time)
        - Deploy from `sprint-0` branch
        - Note the preview URL (e.g., `https://project-name-sprint-0.vercel.app`)
      * **Deploy Backend to Render**:
        - Connect the repository to Render (if first time)
        - Create/update web service to deploy from `sprint-0` branch
        - Configure environment variables (DATABASE_URL, etc.)
        - Note the service URL (e.g., `https://project-name-sprint-0.onrender.com`)
      * **USER INPUT REQUIRED**: Ask user to test the deployed application using the Vercel and Render URLs
      * **WHY**: This confirms the application works in a production-like environment
      * **FORMAT**: User should confirm both frontend and backend are accessible and the health check works
      * Create Pull Request against `main` branch with title: "Sprint 0: Initial Project Setup and Scaffolding"
      * PR description should include:
        - Sprint accomplishments list
        - Vercel preview URL
        - Render backend URL
        - Testing instructions
* **Verification Criteria**: The developer can clone the repo, follow the README to install dependencies and run both services, and see a working "health check" page. All code is on the GitHub `main` branch.

---
#### Sprint 1: Core User Identity & Authentication
* **Sprint ID**: S1: Core User Identity & Authentication
* **Project Context**: A web application that empowers real estate investors to efficiently identify promising investment properties by providing MLS listings filtered by investor-specific criteria and offering tools for financial analysis. This sprint establishes the foundational user system, a prerequisite for any personalized content.
* **Previous Sprint's Accomplishments**: S0 delivered a runnable local development environment with a working frontend, backend, and database connection. The codebase is on GitHub.
* **Goal**: To implement a complete, secure user registration and login flow using JWTs and enhance the UI with glass morphism.
* **Relevant Requirements & User Stories**:
  * "As a user, I need to create a new account with my email and password."
  * "As a user, I need to log in to access my personal dashboard."
* **Tasks**:
  - **1. Database Model**: Define a Pydantic model for the `User` collection in the backend (e.g., `email`, `hashed_password`).
  - **2. Backend: Registration Logic**:
      * Add `passlib` and `python-jose` to `requirements.txt` for hashing and JWTs.
      * Implement the `POST /api/v1/auth/register` endpoint to hash a password and create a new user in MongoDB.
      * **USER INPUT REQUIRED**: Ask the user to test this endpoint with an API client (e.g., Postman) and verify the new user appears in the MongoDB Atlas collection with a hashed password.
      * **WHY**: This confirms the registration logic works correctly and data is properly stored.
      * **FORMAT**: User should provide confirmation that they can see the new user in MongoDB Atlas.
  - **3. Backend: Login Logic**:
      * Implement the `POST /api/v1/auth/login` endpoint to verify credentials and return a JWT access token.
      * **USER INPUT REQUIRED**: Ask the user to test this endpoint with both correct and incorrect credentials.
      * **WHY**: This confirms authentication works correctly and handles invalid credentials properly.
      * **FORMAT**: User should confirm successful login with valid credentials and proper error handling with invalid credentials.
  - **4. Backend: Protected Route**:
      * Create a FastAPI dependency to validate JWTs from request headers.
      * Create a protected `GET /api/v1/users/me` endpoint that returns the current user's data.
      * **USER INPUT REQUIRED**: Ask the user to test this endpoint with and without a valid token.
      * **WHY**: This confirms JWT validation works correctly and protected routes are properly secured.
      * **FORMAT**: User should confirm access with valid token and denial without token.
  - **5. Frontend: UI & State**:
      * Build Login and Register pages using shadcn/ui components.
      * Set up a React Context for managing the user's session and token.
      * Incorporate glass morphism design elements into the login and register forms for a modern look and feel.
      * **USER INPUT REQUIRED**: Ask the user to review the pages in the browser.
      * **WHY**: This confirms the UI components render correctly and the design looks good.
      * **FORMAT**: User should confirm the pages look good and are responsive.
  - **6. Frontend: End-to-End Flow**:
      * Wire up the forms to call the backend registration and login endpoints.
      * Implement logic to store the JWT in local storage and update the session context.
      * Create a protected `/profile` page that redirects to `/login` if no valid token is present.
      * On the `/profile` page, fetch and display data from the `/api/v1/users/me` endpoint.
      * **USER INPUT REQUIRED**: Ask the user to perform a full end-to-end test: register, log in, view the protected profile page, log out, and then be denied access to the profile page.
      * **WHY**: This confirms the entire authentication flow works correctly from frontend to backend.
      * **FORMAT**: User should confirm they can complete the full user journey successfully.
  - **7. Sprint Branch, Commit & Deployment**: After user confirmation of all features, create sprint branch, commit, deploy, and create PR.
      * Create a new branch: `git checkout -b sprint-1`
      * Stage all files: `git add .`
      * Confirm with the user before committing
      * **Commit Format**:
        ```
        feat(sprint-1): implement user identity and authentication with glass morphism UI
        
        Sprint 1 Accomplishments:
        - Created User database model with email and hashed password
        - Implemented user registration endpoint with password hashing
        - Built login endpoint with JWT token generation
        - Added JWT validation middleware for protected routes
        - Created /api/v1/users/me endpoint for current user data
        - Designed and built Login and Register UI pages with glass morphism
        - Implemented React Context for session management
        - Established end-to-end authentication flow with token storage
        - Added protected route logic with authentication redirects
        ```
      * Push branch: `git push origin sprint-1`
      * **Deploy Frontend to Vercel**:
        - Deploy from `sprint-1` branch
        - Note the preview URL (e.g., `https://project-name-sprint-1.vercel.app`)
      * **Deploy Backend to Render**:
        - Update web service to deploy from `sprint-1` branch
        - Note the service URL (e.g., `https://project-name-sprint-1.onrender.com`)
      * **USER INPUT REQUIRED**: Ask user to test the authentication flow on deployed URLs
      * **WHY**: This confirms the authentication system works in production environment
      * **FORMAT**: User should confirm they can register, login, and access protected routes on the deployed app
      * Create Pull Request against `main` branch with title: "Sprint 1: User Identity and Authentication with Glass Morphism"
      * PR description should include:
        - Sprint accomplishments list
        - Vercel preview URL
        - Render backend URL
        - Testing instructions for authentication flow
* **Verification Criteria**: A new user can register, log in, view a protected profile page, and log out. All user data is correctly stored and secured in MongoDB. The login and register forms have a glass morphism effect. All code is on the `main` branch.

---
#### Sprint 2: Property Search and Listing with Landing Page
* **Sprint ID**: S2: Property Search and Listing with Landing Page
* **Project Context**: A web application that empowers real estate investors to efficiently identify promising investment properties by providing MLS listings filtered by investor-specific criteria and offering tools for financial analysis. This sprint implements the core property search and listing functionality, along with a professional landing page.
* **Previous Sprint's Accomplishments**: S1 delivered a complete, secure user registration and login flow with JWTs and glass morphism UI.
* **Goal**: To implement the property search and listing functionality with a professional landing page and glass morphism design elements.
* **Relevant Requirements & User Stories**:
  * "As a user, I can search for properties based on criteria such as price range, property type, and number of bedrooms/bathrooms."
  * "As a user, I can view detailed property information, photos, and map location for each property."
* **Tasks**:
  - **1. Database Model**: Define a Pydantic model for the `Property` collection in the backend (e.g., `address`, `price`, `bedrooms`, `bathrooms`, `zip_code`).
  - **2. Backend: Property Search Logic**:
      * Implement the `GET /api/v1/properties` endpoint to search for properties based on criteria such as price range, property type, number of bedrooms/bathrooms, and zip code.
      * **USER INPUT REQUIRED**: Ask the user to test this endpoint with various search criteria and verify the results.
      * **WHY**: This confirms the property search logic works correctly.
      * **FORMAT**: User should provide confirmation that the search results match the search criteria.
  - **3. Backend: Property Listing Logic**:
      * Implement the `GET /api/v1/properties/{property_id}` endpoint to display detailed property information, photos, and map location for each property.
      * **USER INPUT REQUIRED**: Ask the user to test this endpoint with a valid property ID and verify the details.
      * **WHY**: This confirms the property listing logic works correctly.
      * **FORMAT**: User should provide confirmation that the property details are displayed correctly.
  - **4. Frontend: Landing Page Design**:
      * Design and implement a professional landing page with a clear call to action.
      * Incorporate high-quality images and compelling content to attract users.
      * **USER INPUT REQUIRED**: Ask the user to review the landing page design.
      * **WHY**: This confirms the landing page design is visually appealing and professional.
      * **FORMAT**: User should provide feedback on the landing page design and content.
  - **5. Frontend: Dashboard and Property Detail View**:
      * Build the dashboard view with a search bar, a map, and a list of properties.
      * Build the property detail view with detailed property information, photos, and map location.
      * Incorporate glass morphism design elements into the dashboard and property detail view for a modern look and feel.
      * **USER INPUT REQUIRED**: Ask the user to review the dashboard and property detail view.
      * **WHY**: This confirms the UI components render correctly and the design looks good.
      * **FORMAT**: User should confirm the pages look good and are responsive.
  - **6. Frontend: End-to-End Flow**:
      * Wire up the search bar to call the backend property search endpoint.
      * Wire up the property list to display the search results.
      * Wire up the property detail view to display the property information.
      * **USER INPUT REQUIRED**: Ask the user to perform a full end-to-end test: search for properties, view the search results, and view the property details.
      * **WHY**: This confirms the entire property search and listing flow works correctly from frontend to backend.
      * **FORMAT**: User should confirm they can complete the full user journey successfully.
  - **7. Sprint Branch, Commit & Deployment**: After user confirmation of all features, create sprint branch, commit, deploy, and create PR.
      * Create a new branch: `git checkout -b sprint-2`
      * Stage all files: `git add .`
      * Confirm with the user before committing
      * **Commit Format**:
        ```
        feat(sprint-2): implement property search and listing with landing page and glass morphism UI
        
        Sprint 2 Accomplishments:
        - Created Property database model with address, price, bedrooms, bathrooms, and zip code
        - Implemented property search endpoint with search criteria
        - Built property listing endpoint with property details
        - Designed and built professional landing page
        - Designed and built dashboard and property detail view with glass morphism
        - Implemented end-to-end property search and listing flow
        ```
      * Push branch: `git push origin sprint-2`
      * **Deploy Frontend to Vercel**:
        - Deploy from `sprint-2` branch
        - Note the preview URL (e.g., `https://project-name-sprint-2.vercel.app`)
      * **Deploy Backend to Render**:
        - Update web service to deploy from `sprint-2` branch
        - Note the service URL (e.g., `https://project-name-sprint-2.onrender.com`)
      * **USER INPUT REQUIRED**: Ask user to test the property search and listing flow on deployed URLs
      * **WHY**: This confirms the property search and listing system works in production environment
      * **FORMAT**: User should confirm they can search for properties, view the search results, and view the property details on the deployed app
      * Create Pull Request against `main` branch with title: "Sprint 2: Property Search and Listing with Landing Page and Glass Morphism"
      * PR description should include:
        - Sprint accomplishments list
        - Vercel preview URL
        - Render backend URL
        - Testing instructions for property search and listing flow
* **Verification Criteria**: A user can search for properties based on criteria such as price range, property type, and number of bedrooms/bathrooms. A user can view detailed property information, photos, and map location for each property. The landing page is visually appealing and professional. The dashboard and property detail view have a glass morphism effect. All code is on the `main` branch.
