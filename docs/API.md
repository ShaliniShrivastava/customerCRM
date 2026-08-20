# API Documentation

Base URL:


http://localhost:5000/api


## Authentication

Authentication uses JWT stored in an HTTP-only cookie.

Protected endpoints require the user to be logged in.

Admin endpoints require the logged-in user to have:


role: admin


---

## Auth APIs

### Register

`POST /auth/register`

Creates a new user account.

Request:

```json
{
  "name": "Shalini",
  "email": "shalini@example.com",
  "password": "123456"
}
```

### Login

`POST /auth/login`

Logs in a user or admin and creates the authentication cookie.

Request:

```json
{
  "email": "shalini@example.com",
  "password": "123456"
}
```

### Create Admin

`POST /auth/create-admin`

Creates the first admin account.

Required header:

```text
admin-secret-key: <ADMIN_SECRET_KEY>
```

Request:

```json
{
  "name": "Admin",
  "email": "admin@customercrm.com",
  "password": "123456"
}
```

### Get Profile

`GET /auth/profile`

Requires authentication.

### Logout

`POST /auth/logout`

Logs out the current user.

---

## User APIs

### Get Profile

`GET /users/profile`

Requires authentication.

### Update Profile

`PUT /users/profile`

Requires authentication.

Request:

```json
{
  "name": "Shalini",
  "email": "shalini@example.com"
}
```

### Change Password

`PUT /users/change-password`

Requires authentication.

Request:

```json
{
  "currentPassword": "123456",
  "newPassword": "abcdef"
}
```

---

## Lead APIs

### Create Lead

`POST /leads`

Requires authentication.

Users create a requirement using their own account details.

Admins can create a lead with customer name and email.

### Get My Leads

`GET /leads/my`

Requires authentication.

Returns requirements created by the logged-in user.

### Get All Leads

`GET /leads`

Admin only.

Query parameters:

```text
search
status
sort
order
page
limit
```



### Get Lead

`GET /leads/:id`

Admin only.

### Update Lead

`PUT /leads/:id`

Admin only.

### Delete Lead

`DELETE /leads/:id`

Admin only.

### Import Leads From File

`POST /leads/import`

Admin only.

Form-data:

```text
file: <CSV/XLSX/PDF/JPG/JPEG/PNG/WEBP>
```

Maximum file size:


10 MB


### Import Leads From API

`POST /leads/import-api`

Admin only.

Request:

```json
{
  "apiUrl": "https://example.com/api/leads"
}
```

The external API should return lead data in JSON format.

---

## Dashboard API

### Get Dashboard Statistics

`GET /dashboard/stats`

Admin only.

Returns:

* Total leads
* New leads
* Contacted leads
* Qualified leads
* Converted leads
* Total users

---

## AI API

### Analyze Lead

`GET /ai/lead/:id/analyze`

Admin only.

Uses Google Gemini to analyze a lead.

Response contains:

```json
{
  "summary": "",
  "needSummary": "",
  "requirementClarity": "",
  "missingInformation": [],
  "recommendedFollowUp": ""
}
```

---

## Admin APIs

### Get All Users

`GET /admin/users`

Admin only.

### Block / Unblock User

`PATCH /admin/users/:id/block`

Admin only.

### Delete User

`DELETE /admin/users/:id`

Admin only.

---

## Website Content APIs

### Get Website Content

`GET /admin/website`

Public access.

### Update Website Content

`PUT /admin/website`

Admin only.

### Add Feature

`POST /admin/website/features`

Admin only.

Request:

```json
{
  "title": "Lead Management",
  "description": "Manage customer leads easily."
}
```

### Update Feature

`PUT /admin/website/features/:id`

Admin only.

### Delete Feature

`DELETE /admin/website/features/:id`

Admin only.

---

## Contact APIs

### Create Contact

`POST /admin/contact`

Requires authentication.

Request:

```json
{
  "message": "I need help with my requirement."
}
```

### Get My Contacts

`GET /admin/contact/my`

Requires authentication.

### Get All Contacts

`GET /admin/contact`

Admin only.

### Reply To Contact

`PUT /admin/contact/:id/reply`

Admin only.

Request:

```json
{
  "reply": "Thank you. We will contact you soon."
}
```

---

## Common Response Format

Successful responses generally follow:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error responses generally follow:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Authorization Summary

| API Group          | User      | Admin |
| ------------------ | --------- | ----- |
| Auth               | Yes       | Yes   |
| User Profile       | Yes       | Yes   |
| Create Lead        | Yes       | Yes   |
| My Leads           | Yes       | Yes   |
| Manage All Leads   | No        | Yes   |
| Import Leads       | No        | Yes   |
| Dashboard          | No        | Yes   |
| AI Analysis        | No        | Yes   |
| User Management    | No        | Yes   |
| Website Content    | Public/No | Yes   |
| Contact            | Yes       | Yes   |
| Contact Management | No        | Yes   |
