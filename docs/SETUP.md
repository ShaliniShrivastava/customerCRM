# Local Setup Guide

This guide explains how to run CustomerCRM on a local machine.

## 1. Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB
- Git

## 2. Backend Setup

Open the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

Add the required variables:

```env
PORT=5000
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLIENT_URL=http://localhost:3000
NODE_ENV=development
ADMIN_SECRET_KEY=<your-admin-secret>
GEMINI_API_KEY=<your-gemini-api-key>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

## 3. Frontend Setup

Open another terminal and move to the frontend:

```bash
cd client
npm install
```

Create a `.env.local` file inside the `client` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

## 4. MongoDB Setup

CustomerCRM uses MongoDB with Mongoose.

Set the MongoDB connection string in:

```env
MONGO_URL=<your-mongodb-connection-string>
```

Make sure the MongoDB database is accessible before starting the backend.

## 5. Admin Setup

The project provides a protected endpoint to create the first admin account.

Use:

```text
POST /api/auth/create-admin
```

and provide the `ADMIN_SECRET_KEY` through the request header.

The admin email must use:

```text
@customercrm.com
```

Only one admin account is allowed by the current implementation.

## 6. Run the Project

Run both applications in separate terminals:

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

Then open :

http://localhost:3000

## 7. Basic Verification

After starting the project, verify that:

- The homepage loads correctly.
- User registration and login work.
- Admin login works.
- Users can submit requirements.
- Admin can view leads and users.
- Lead import works.
- AI lead analysis works.
- Contact messages and replies work.

Use `.env.example` to document the required environment variable names.
