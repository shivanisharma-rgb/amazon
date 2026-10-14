# Northstar Market

A responsive, Amazon-inspired storefront with original Northstar branding, a React/Vite client, and an Express/Mongoose API. The storefront works in local demo mode without a database; the API enables registered accounts, database-backed products, reviews, carts, and orders when configured.

## Requirements

- Node.js 20 or newer and npm
- MongoDB 6+ for the API and database-backed features

## Run locally

From the project root:

```bash
npm install
npm install --prefix client
npm install --prefix server
cp .env.example server/.env
```

Set `MONGODB_URI` and a random `JWT_SECRET` of at least 32 characters in `server/.env`. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` (at least 12 characters) to create the first administrator account on API startup. Start MongoDB, then run:

```bash
npm run dev
```

The storefront is at <http://localhost:5173>; the API is at <http://localhost:5000/api>. To build the production frontend, run `npm run build`. To run only the production API, run `npm start`.

## Pages and functionality

The client includes Home, All Products, Product Details, Categories, Search Results, Shopping Cart, Login, Register, User Profile, My Orders, Checkout, and Admin Dashboard routes. Search, category/price/rating filters, sorting, quantity controls, local persistent cart and wishlist, demo checkout, account forms, order history, and responsive layouts work without an API connection. The client uses a local demo catalog if the API has no products or cannot be reached.

The API provides product/category, user/authentication, cart, order, and review endpoints. Passwords are bcrypt-hashed; JWTs are checked server-side; admin operations require the administrator role. On startup, the API adds any missing items from the 40-product starter catalog without overwriting existing products. Demo checkout is explicitly not a payment integration: it creates unpaid orders and never accepts or stores card details. A payment gateway such as Stripe still needs credentials and server-side payment-intent/webhook verification before real payments can be enabled.

## Initial administrator

Configure `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` before starting the API. The account is created as an administrator only when that email does not already exist. Registration always creates customer accounts; it cannot grant administrator privileges.

## API overview

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/products`, `GET /api/products/:id`, admin `POST/PATCH/DELETE /api/products`
- `GET /api/categories`
- Authenticated `GET/PUT /api/cart`
- Authenticated `GET/POST /api/orders`, admin `PATCH /api/orders/:id/status`
- `GET /api/products/:id/reviews`, authenticated `POST /api/products/:id/reviews`
- Admin `GET /api/admin/stats`
# amazon
