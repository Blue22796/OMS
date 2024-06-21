# Order Management System (OMS) for E-commerce Mobile App

This project implements an Order Management System (OMS) backend for an e-commerce mobile application using NestJS and Prisma with PostgreSQL database.

## Table of Contents
1. [Tech Stack](#requirements)
2. [Setup](#setup)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)

## Tech Stack
- **Backend Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL

## Setup
To set up and run this project locally, follow these steps:

### Clone Repository
```bash
git clone <repository_url>
cd <project_folder>
```

### Install Dependencies
```bash
npm install
```

### Set Environment Variables
Create a `.env` file and fill in your PostgreSQL database credentials.

### Database Migration
Ensure your PostgreSQL server is running, then run:
```bash
npx prisma migrate dev --name init
```

### Run the Application
```bash
npm run start:dev
```

## Database Schema
### Entities:
- **User**: userId, name, email, password, address
- **Product**: productId, name, description, price, stock
- **Order**: orderId, orderDate, status, Total
- **Cart**: cartId, UserId, OrderId, Total
- **CartItem**: cartItemId, cartId, ProductId, quantity
- **Coupon**: CouponId, Coupon, Off
- **CouponApplied**: Coupon, OrderId

Prisma ORM is used to define and manage these entities in PostgreSQL.

## API Endpoints
### Cart Management:
- **Add to Cart:**
  - `POST /api/cart/add`
- **View Cart:**
  - `GET /api/cart/:userId`
- **Update Cart:**
  - `PUT /api/cart/update`
- **Remove From Cart:**
  - `DELETE /api/cart/remove`

### Order Management:
- **Create Order:**
  - `POST /api/orders`
- **Get Order by ID:**
  - `GET /api/orders/:orderId`
- **Update Order Status:**
  - `PUT /api/orders/:orderId/status` 
- **Order History Retrieval:**
  - `GET /api/users/:userId/orders`
- **Apply Discount/Coupon to Order:**
  - `POST /api/orders/apply-coupon`
This README provides a comprehensive guide to setting up, running, and understanding the Order Management System implemented for the e-commerce mobile app backend. For any questions or issues, please refer to the documentation or contact the project team.
