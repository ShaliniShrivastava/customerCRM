# Deployment Guide

This guide describes the planned production deployment process for CustomerCRM.

## Deployment Plan

CustomerCRM will be deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

## 1. GitHub Repository

Push the complete CustomerCRM project to a GitHub repository.

The following files should not be committed:

node_modules/
.env
uploads/
dist/

## 2. Database Deployment

Create a MongoDB database using MongoDB Atlas.

After creating the database, obtain the MongoDB connection string and use it as:

```env
MONGO_URL=your_mongodb_connection_string
```

## 3. Backend Deployment

Deploy the `backend` folder as a Web Service on Render.

Build command:

```bash
npm install
```

Start command:

```bash
npm start
```

Add the required backend environment variables:

```env
PORT=5000
CLIENT_URL=your_frontend_url
NODE_ENV=production
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_SECRET_KEY=your_admin_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

After deployment, the backend will have a public API URL.

## 4. Frontend Deployment

Deploy the `client` folder on Vercel.

Set the frontend environment variable:

```env
NEXT_PUBLIC_API_URL=your_backend_url/api
```

## 5. Frontend and Backend Connection

After the frontend receives its production URL, update the backend environment variable:

```env
CLIENT_URL=your_frontend_url
```

This allows the backend to accept requests from the deployed frontend.

## 6. Deployment Verification

After deployment, verify:

- Homepage loads correctly.
- User registration and login work.
- Admin login works.
- Requirements can be submitted.
- Leads can be viewed and managed.
- Lead import works.
- AI lead analysis works.
- Contact messages and replies work.

## 7. Production URLs

After deployment, update this section with the actual URLs:

```text
Frontend:
<production-frontend-url>

Backend:
<production-backend-url>
```


