# CustomerCRM

CustomerCRM is a web-based customer relationship management (CRM) platform for managing leads, customer requirements, users, and business interactions from one place.

It also provides AI-powered lead analysis to help administrators understand customer requirements and plan follow-ups.

## FEATURES

### User

- Register and login
- Submit customer requirements
- View submitted requirements and their status
- Contact the admin and view replies
- Update profile
- Change password

### Admin

- Dashboard with CRM statistics
- View, search, filter, sort, and paginate leads
- Delete leads
- Import leads from CSV, Excel, PDF, and images
- Import leads from an external JSON API
- AI-based lead analysis using Google Gemini
- View, block/unblock, and delete users
- Manage website content and features
- View customer messages and reply to them
- Change admin password

## TECHNOLOGY 

### Frontend

- Next.js 16
- React 19
- JavaScript
- Tailwind CSS 4
- Redux Toolkit
- RTK Query

### Backend

- Node.js
- Express.js 5
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Google Gemini AI
- Tesseract.js
- PDF parsing
- Excel/CSV processing

## SECURITY

- JWT authentication with HTTP-only cookies
- Role-based access control for users and admins
- Password hashing with bcrypt
- Helmet security headers
- API rate limiting
- CORS protection
- File type and 10 MB size validation
- Protected admin creation using a secret key
- Sensitive credentials managed through environment variables
- Input validation for required fields and allowed values

## PROJECT STRUCTURE

customerCRM/
├── client/
├── backend/
├── docs/
│ ├── API.md
│ ├── SETUP.md
│ ├── DEPLOYMENT.md
│ ├── SCHEMA.md
│ └── SECURITY.md
├── .env.example
└── README.md

## HOW IT WORKS

A normal user can create an account, log in, submit a requirement, view their previous requirements, and communicate with the admin.

The admin can manage leads and users, import lead data from different sources, analyze leads with Gemini AI, manage website content, and reply to customer messages.

## GETTING STARTED

### 1. Backend setup

bash
cd backend
npm install
npm run dev

The backend runs on the port configured in the environment variables, or `5000` by default.

### 2. Frontend setup

Open another terminal:

bash
cd client
npm install
npm run dev

The frontend runs using the Next.js development server.

## ENVIRONMENT VARIABLES

Create `.env` files according to `.env.example`.

The backend uses environment variables for:

MONGO_URL
JWT_SECRET
CLIENT_URL
PORT
ADMIN_SECRET_KEY
GEMINI_API_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

The frontend uses:

NEXT_PUBLIC_API_URL

## API

The backend APIs are grouped into:

/api/auth
/api/users
/api/admin
/api/leads
/api/dashboard
/api/ai

Detailed endpoints and request/response information can be documented in:

```text
docs/API.md
```

## LEAD IMPORT

The admin can import leads using:

- CSV
- XLSX
- PDF
- JPG/JPEG
- PNG
- WEBP
- External JSON API

Uploaded files are validated and limited to 10 MB.

PDF data is extracted using pdf-parse, while image data is read using Tesseract OCR.

## AI LEAD ANALYSIS

Customer leads can be analyzed by the admin using Google Gemini.

The analysis provides:

- Lead summary
- Customer need summary
- Requirement clarity
- Missing information
- Recommended follow-up

## AUTHENTICATION

CustomerCRM uses JWT authentication stored in an HTTP-only cookie.

Access is separated using two roles:

user
admin

Admin-only routes require authentication and admin authorization.

## DEVELOPMENT SCRIPTS

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Documentation

Detailed project documentation is kept in:

- `docs/API.md` – API endpoints
- `docs/SETUP.md` – Local development and setup
- `docs/DEPLOYMENT.md` – Production deployment
- `docs/SECURITY.md` – security implementation
- `docs/SCHEMA.md` – Database schema
