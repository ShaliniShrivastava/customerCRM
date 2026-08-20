# Security

CustomerCRM includes the following security measures.

## Authentication

* JWT is used for user authentication.
* The JWT is stored in an HTTP-only cookie.
* Invalid or expired tokens are rejected.

## Authorization

* The application uses role-based authorization.
* Users and admins have separate access permissions.
* Admin-only routes are protected by authentication and admin authorization middleware.

## Password Security

* Passwords are hashed using bcrypt before storing them in MongoDB.
* Passwords are never returned in profile queries.

## API Security

* Helmet is used to add security-related HTTP headers.
* API rate limiting is enabled for `/api` routes.
* CORS is configured using the allowed frontend URL and credentials.

## File Upload Security

* Only CSV, XLSX, PDF, JPG, JPEG, PNG, and WEBP files are accepted.
* Uploaded files are checked using both file extension and MIME type.
* The maximum upload size is 10 MB.
* Uploaded temporary files are removed after processing.

## Admin Creation Security

* Admin creation requires the `ADMIN_SECRET_KEY`.
* Only one admin account can be created by the current implementation.
* Admin email addresses must use the `@customercrm.com` domain.

## Environment Variables

Sensitive values such as database credentials, JWT secrets, API keys, and Cloudinary credentials are stored in environment variables.


