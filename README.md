# Cafe Fresco (Frontend)

Cafe Fresco is a modern Food Restraunent store frontend built with React + Vite. It provides product browsing, authentication flows, cart and wishlist management, checkout, and order tracking with Stripe/COD payment support.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started (Beginner Guide)](#getting-started-beginner-guide)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How the App Flow Works](#how-the-app-flow-works)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## Project Overview

This project is the frontend for an e-commerce coffee website. It communicates with a backend API (via `VITE_BASE_URL`) and supports:

- User authentication (signup, login, forgot/reset password)
- Product listing and product detail pages
- Add to cart and cart quantity updates
- Wishlist support
- Discount code application
- Checkout and payment (Stripe + Cash on Delivery)
- User profile and order tracking
- Contact form and toast notifications

## Core Features

### 1) Authentication & User Account
- Register new user account
- Login with stored session/token support
- Forgot password flow
- Reset password via token route
- View user profile

### 2) Product Experience
- Browse all products
- View featured products and new releases
- Filter/browse by categories
- Search products from global state
- Open product detail page by route

### 3) Cart & Wishlist
- Add products to cart
- Update cart item quantity
- Remove items from cart
- Add/remove wishlist items
- Persistent cart/wishlist state synced from backend

### 4) Checkout & Payments
- Address input and order summary
- Apply discount codes and recalculate totals
- Stripe card payment integration
- Cash on Delivery (COD) option
- Order creation + payment record + transaction linking
- Order confirmation email trigger from API

### 5) Order & Support
- Track user order history
- Contact form submission
- Real-time toast notifications for actions/errors

## Tech Stack

### Frontend
- React 18
- React Router DOM 6
- Vite 5
- Context API (custom global product/cart state)

### Libraries
- `@stripe/react-stripe-js`, `@stripe/stripe-js` for payments
- `react-hot-toast` for notifications
- `js-cookie` for token/session handling
- `react-select` for select UX
- `boxicons` for icons

### Tooling
- ESLint 9
- Vite build tooling

## Project Structure

```text
src/
	Components/        # UI pages and reusable sections
	Context/           # Global app state (cart, wishlist, totals, search)
	assets/            # Images, logos, media
	Product.json       # Local product data file (if used)
	App.jsx            # Route declarations and app layout
	main.jsx           # React root mount
```

## Getting Started (Beginner Guide)

Follow these steps from zero setup:

### Step 1: Install prerequisites

Install the following on your machine:

- Node.js (LTS recommended)
- npm (comes with Node.js)
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

### Step 2: Clone/open project

```bash
git clone <your-repo-url>
cd cafeFresco-main
```

If you already have the folder, just open it in VS Code.

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Create environment file

Create a `.env` file in project root and add:

```env
VITE_BASE_URL=http://localhost:5000/api
VITE_STRIPE_KEY=pk_test_your_stripe_publishable_key
```

> Replace with your real backend API URL and Stripe publishable key.

### Step 5: Run development server

```bash
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

### Step 6: Make sure backend is running

This frontend requires a backend API for:

- auth
- products
- cart/wishlist
- discount
- orders/payments
- tracking

If backend is not running, many features will show fetch errors.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_BASE_URL` | Yes | Base URL for all backend API requests |
| `VITE_STRIPE_KEY` | Yes (for Stripe) | Stripe publishable key used by Stripe Elements |

## Available Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint checks
```

## How the App Flow Works

1. User visits home and explores products.
2. User can sign up/login before cart or wishlist actions.
3. User adds items to cart/wishlist.
4. User proceeds to address and payment step.
5. User chooses Stripe or COD.
6. Order is created, payment entry is stored, and order tracking becomes available.

## Deployment

This project includes `vercel.json`, so it is ready for Vercel-style deployment.

Before deploying:

- Set correct environment variables in deployment platform.
- Ensure backend API is publicly accessible.
- Use live Stripe publishable key for production.

## Troubleshooting

### Blank data or failed requests
- Check `.env` values.
- Confirm backend server is running.
- Verify CORS and credentials configuration on backend.

### Stripe payment not loading
- Ensure `VITE_STRIPE_KEY` is valid.
- Confirm Stripe is enabled in your backend payment routes.

### Build issues

```bash
npm run lint
npm run build
```

Fix lint/build errors shown in terminal.

## Future Improvements

- Add unit/integration tests
- Add admin dashboard
- Add order cancellation/refund flow
- Add stronger loading/error states for all API views

---

Developed by Muhammad Ismaeel.
