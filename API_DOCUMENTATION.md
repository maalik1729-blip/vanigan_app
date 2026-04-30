# Vanigan API Documentation

## Base URL
**Production:** `https://vanigan-app.onrender.com`

## Root Endpoint
When you visit the root URL, you'll see a comprehensive JSON response with:
- API status
- Version information
- All available endpoints
- Endpoint descriptions

**Example:**
```
GET https://vanigan-app.onrender.com/
```

**Response:**
```json
{
  "status": "success",
  "message": "Welcome to Vanigan API",
  "version": "1.0.1",
  "timestamp": "2026-04-30T...",
  "endpoints": { ... },
  "health": { ... },
  "documentation": { ... }
}
```

## Health Check
```
GET https://vanigan-app.onrender.com/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Vanigan API is running",
  "uptime": 12345.67,
  "timestamp": "2026-04-30T..."
}
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Businesses (`/api/businesses`)
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get business by ID
- `POST /api/businesses` - Create business (requires auth)
- `PUT /api/businesses/:id` - Update business (requires auth)
- `DELETE /api/businesses/:id` - Delete business (requires auth)

### Categories (`/api/categories`)
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (requires admin)
- `PUT /api/categories/:id` - Update category (requires admin)
- `DELETE /api/categories/:id` - Delete category (requires admin)

### Organizers (`/api/organizers`)
- `GET /api/organizers` - Get all organizers
- `GET /api/organizers/:id` - Get organizer by ID
- `POST /api/organizers` - Create organizer (requires auth)
- `PUT /api/organizers/:id` - Update organizer (requires auth)
- `DELETE /api/organizers/:id` - Delete organizer (requires auth)

### Members (`/api/members`)
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create member (requires auth)
- `PUT /api/members/:id` - Update member (requires auth)
- `DELETE /api/members/:id` - Delete member (requires auth)

### News (`/api/news`)
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news (requires admin)
- `PUT /api/news/:id` - Update news (requires admin)
- `DELETE /api/news/:id` - Delete news (requires admin)

### Subscriptions (`/api/subscriptions`)
- `GET /api/subscriptions` - Get all subscriptions
- `GET /api/subscriptions/:id` - Get subscription by ID
- `POST /api/subscriptions` - Create subscription (requires auth)
- `PUT /api/subscriptions/:id` - Update subscription (requires auth)
- `DELETE /api/subscriptions/:id` - Delete subscription (requires auth)

### Partners (`/api/partners`)
- `GET /api/partners` - Get all partners
- `GET /api/partners/:id` - Get partner by ID
- `POST /api/partners` - Create partner (requires auth)
- `PUT /api/partners/:id` - Update partner (requires auth)
- `DELETE /api/partners/:id` - Delete partner (requires auth)

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Testing the API
You can test the API using:
- **Browser:** Visit `https://vanigan-app.onrender.com/`
- **Postman:** Import the endpoints
- **cURL:** Command line testing
- **Mobile App:** Use the production APK

## Example Request

### Login
```bash
curl -X POST https://vanigan-app.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "1234567890",
    "password": "admin@123"
  }'
```

### Get Businesses
```bash
curl -X GET https://vanigan-app.onrender.com/api/businesses \
  -H "Authorization: Bearer <your_token>"
```

## Support
For issues or questions, contact the development team or visit:
- GitHub: https://github.com/maalik1729-blip/vanigan_app
- Render Dashboard: https://dashboard.render.com
