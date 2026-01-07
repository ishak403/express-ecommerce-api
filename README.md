# 🛒 Express E-Commerce REST API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-blue?logo=sequelize)
![JWT](https://img.shields.io/badge/JWT-Authentication-purple?logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-green?logo=swagger)
![Render](https://img.shields.io/badge/Deployed%20on-Render-black?logo=render)
![Tests](https://img.shields.io/badge/Tests-Jest%20%2B%20Supertest-red?logo=jest)

A production-style E-Commerce REST API built using Node.js, Express, PostgreSQL, and Sequelize.
The project demonstrates real-world backend architecture including authentication, authorization, product management, cart handling, order processing, validation, logging, API documentation, and integration testing.

This repository is designed as a backend portfolio project for beginner to intermediate backend developers, following industry best practices.

## 🚀 Features

### ✅ Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin / Customer)
- Protected routes with middleware

### 🛍 Product Management
- Admin-only product creation, update, and deletion
- Product search & filtering
- Keyword search
- Category filter
- Price range filter
- Pagination support
- Fetch product details by ID

### 🛒 Shopping Cart
- Add products to cart
- Update cart item quantity
- Remove items from cart
- View cart contents
- Automatic cart total calculation

### 📦 Order Processing
- Create orders from cart contents
- View logged-in user’s order history
- Admin can view all orders
- Order status management:
  - pending
  - paid
  - shipped

### 🧪 Testing
- Integration tests using Jest + Supertest
- Covers:
  - Authentication
  - Products
  - Cart
  - Orders
- Uses real database interactions for realistic test coverage

### 📑 API Documentation
- Interactive Swagger UI
- Clear request/response schemas
- JWT authentication supported directly in Swagger

### 🛡 Validation, Error Handling & Logging
- Request validation using Joi
- Centralized error-handling middleware
- Structured request & error logging using Winston

## 🧰 Tech Stack

| Technology      | Usage                  |
|-----------------|------------------------|
| Node.js         | Runtime                |
| Express.js      | Web framework          |
| PostgreSQL      | Database               |
| Sequelize       | ORM                    |
| JWT             | Authentication         |
| Joi             | Input validation       |
| Swagger         | API documentation      |
| Winston         | Logging                |
| Jest + Supertest| Testing                |

## 📁 Project Structure

```
src/
├── config/          # Database & Swagger configuration
├── controllers/     # Business logic
├── middleware/      # Auth, validation, logging, error handling
├── models/          # Sequelize models & associations
├── routes/          # API route definitions
├── validators/      # Joi validation schemas
├── utils/           # Helper utilities
├── app.js           # Express app
└── server.js        # Server bootstrap

tests/
├── auth.test.js
├── product.test.js
├── cart.test.js
└── order.test.js

logs/
├── error.log
└── combined.log
```

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

📌 Tip: Include a `.env.example` file in production repositories.

## 🏗 Setup Instructions

1️⃣ Clone Repository
```
git clone https://github.com/your-username/express-ecommerce-api.git
cd express-ecommerce-api
```

2️⃣ Install Dependencies
```
npm install
```

3️⃣ Setup Database
- Create a PostgreSQL database using pgAdmin 4
- Update `.env` with your database credentials
- Sequelize will automatically create tables on server start

4️⃣ Start Server
```
npm run dev
```

Server will run at: http://localhost:5000

## 🚀 Production Deployment

This project is deployed on **Render (Free Tier)** with a managed **PostgreSQL** database.

### 🔗 Live URLs

- **API Base URL**  
  https://express-ecommerce-api-xedd.onrender.com

- **Swagger Documentation**  
  https://express-ecommerce-api-xedd.onrender.com/api-docs

### 🗄 Database
- PostgreSQL (Render managed service)
- Sequelize ORM
- Tables are automatically created on first startup using `sequelize.sync()`

### 🔐 Environment Variables (Production)

Configured securely via Render dashboard:

- `PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `NODE_ENV=production`

### ⚙ Deployment Flow

1. Code pushed to GitHub (`main` branch)
2. Render auto-builds the Node.js application
3. Environment variables injected at runtime
4. Database connection validated
5. Tables synchronized
6. API becomes publicly accessible

### 💤 Free Tier Notes
- Service spins down after inactivity
- First request may take ~30–50 seconds


## 📘 Swagger API Documentation

Once the server is running, open: http://localhost:5000/api-docs

### Swagger Features
- Interactive API testing
- JWT authorization support
- Auto-generated request/response schemas
- Token persistence enabled

## 🧪 Running Tests

This project uses integration tests (real API + database).

```
npm test
```

Sample Output
```
Test Suites: 4 passed, 4 total
Tests:       8 passed, 8 total
```

### ✔ Covered Modules
- Authentication
- Products
- Cart
- Orders

## 🔐 Authentication Flow

1. Register a user
2. Login to receive JWT token
3. Pass token in request headers: `Authorization: Bearer <JWT_TOKEN>`

Swagger UI supports token persistence for easier testing.

## 📌 API Design Notes

Product listing & filtering implemented via: `POST /api/products/search`

Chosen to support complex filters using request body

RESTful principles followed with pragmatic design decisions

## 🧠 Learning Outcomes

This project demonstrates:
- Real-world Express.js architecture
- Secure authentication & authorization
- ORM-based relational database modeling
- Centralized validation & error handling
- API documentation using Swagger
- Integration testing strategy
- Logging & observability basics

## 🔮 Future Enhancements
- Unit tests for utility functions
- Rate limiting
- Caching (Redis)
- Email notifications
- Payment gateway integration
- API versioning
- Docker & containerization

## 👨‍💻 Author

Ishak Manihar  
Backend Developer  

📌 Node.js | Express | PostgreSQL | REST APIs

## ⭐ Final Note

If you find this project helpful, feel free to ⭐ star the repository and use it as a reference for building scalable backend applications.