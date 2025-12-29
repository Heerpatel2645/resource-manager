# Resource Manager

A web application for managing learning resources (articles, videos, and tutorials) built with React, TypeScript, and Node.js.

## 🚀 Features

- **List Resources** - View all resources with filtering and search
- **Add Resource** - Create new resources with title, description, type, link, and file upload
- **Edit Resource** - Update existing resources
- **Delete Resource** - Remove resources with confirmation
- **Search & Filter** - Search by title/description and filter by type
- **File Upload** - Upload PDFs, images, and other files
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library

### Backend
- **Node.js** with Express
- **Multer** - File upload handling
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd resource-manager
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Create Resource Data File

Since `resources.json` is in `.gitignore`, you need to create it manually before running the application:

```bash
cd ../backend/src/data
```

Create a file named `resources.json` with the following content (an empty array to start):

```json
[]
```

**Note:** If the `data` directory doesn't exist, create it first:
```bash
mkdir -p backend/src/data
```

Alternatively, you can create the file using your text editor:
- Navigate to `backend/src/data/`
- Create a new file named `resources.json`
- Add the content: `[]`

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
resource-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Middleware (upload)
│   │   ├── data/           # JSON data storage
│   │   └── app.js          # Express app setup
│   ├── uploads/            # Uploaded files
│   └── server.js           # Server entry point
│
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   │   ├── modals/     # Modal components
    │   ├── pages/          # Page components
    │   ├── services/       # API service layer
    │   ├── types/          # TypeScript types
    │   └── styles/         # Global styles
    └── public/             # Static assets
```

## 🎯 API Endpoints

- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create a new resource
- `PUT /api/resources/:id` - Update a resource
- `DELETE /api/resources/:id` - Delete a resource
- `GET /uploads/:filename` - Get uploaded file

## 💡 Key Features Implementation

### Component Architecture
- **Reusable Components** - Header, FilterTabs, ResourceList, EmptyState
- **Modal Components** - AddResourceModal, ResourceDetailModal
- **Separation of Concerns** - Services layer for API calls, types for data structures

### State Management
- React hooks (useState, useEffect) for local state
- Props drilling for component communication

### Form Handling
- Controlled components for form inputs
- Client-side validation
- File upload support with FormData

### Styling
- Tailwind CSS for utility-first styling
- Responsive design with mobile-first approach
- Hover effects and transitions

## 🔍 Search & Filter

- **Search**: Case-insensitive search across title, description, and type
- **Filter**: Filter resources by type (All, Article, Video, Tutorial)
- **Combined**: Search and filter work together

## 📝 Data Persistence

Resources are stored in `backend/src/data/resources.json` and files are stored in `backend/uploads/`.


