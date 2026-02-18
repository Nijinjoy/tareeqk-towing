# Tareeqk Towing Request System

A lightweight full-stack towing request system:
- Laravel backend API (PHP/MySQL)
- React (Vite) web app for customers
- React Native app for drivers/customers

This repo is intentionally minimal and meant to be easy to run locally or extend.

## Repository layout
- `backend/` Laravel API
- `web/` React (Vite) web client
- `app/` React Native client

## Backend (Laravel)

### Requirements
- PHP 8.x
- Composer
- MySQL (or compatible database)

### Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Update database credentials in `.env`, then run:
```bash
php artisan migrate
php artisan serve
```

The API will be available at `http://127.0.0.1:8000`.

### API routes
Defined in `backend/routes/api.php`.

- `GET /api/requests`
  - Returns a paginated list of towing requests.
- `POST /api/requests`
  - Creates a request.
  - Body:
    - `customer_name` (string, required)
    - `location` (string, required)
    - `note` (string, optional)
- `POST /api/requests/{towingRequest}/assign`
  - Marks a request as assigned.
- `DELETE /api/requests/{towingRequest}`
  - Deletes a request.

### Data model
`backend/app/Models/TowingRequest.php` fields:
- `customer_name`
- `location`
- `note` (nullable)
- `status` (default: `pending`)

## Web (React)

### Requirements
- Node.js 18+
- npm

### Setup
```bash
cd web
npm install
npm run dev
```

The web app runs at the Vite dev URL and uses the API at:
`web/src/api.js` → `http://127.0.0.1:8000/api`

### Usage
- Sign in as `customer` or `driver`.
- Customers can submit towing requests.
- Drivers see a placeholder console view.

## Mobile (React Native)

### Requirements
- Node.js 18+
- npm
- iOS/Android simulator or device

### Setup
```bash
cd app
npm install
npm run ios
# or
npm run android
```

API configuration is in `app/src/services/requests.ts`:
- iOS: `http://127.0.0.1:8000/api`
- Android emulator: `http://10.0.2.2:8000/api`

### Usage
- Sign in as `customer` or `driver`.
- The Requests tab shows live updates and supports assign/delete.

## Common issues
- If deletes reappear, confirm the API responds `204` to `DELETE /api/requests/{id}`.
- If the app can’t reach the API, confirm `php artisan serve` is running and the base URL matches your device/simulator.

## Notes
- There is no real authentication; login is a local role selector for UI flow.
- You can extend the API with auth, users, or real-time updates as needed.
