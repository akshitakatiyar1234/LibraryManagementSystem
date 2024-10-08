# LibraryManagementSystem

A simple library management system built using Node.js, Express, MongoDB, and Mongoose.

**Features**
-> User authentication with JWT (JSON Web Tokens)
-> Book borrowing and returning functionality
-> User with valid Credentials can add, update, and delete books
-> CRUD operations for all the features(book,borrow,user)
-> Track which users have borrowed or returned books
-> Hashed password using Bcrypt

**Project Structure**

library-management/
│
├── app.js                 # Application entry point
├── server.js              # Server setup
├── config/
│   └── db.js              # MongoDB connection setup
├── controllers/
│   ├── book.controller.js # Controllers for managing books
│   ├── borrow.controller.js # Controllers for managing borrowing and returning
│   └── user.controller.js # Controllers for user management
├── middlewares/
│   └── auth.js            # Middleware for authentication (JWT)
├── models/
│   ├── book.model.js      # Book schema
│   ├── borrow.model.js    # Borrow schema
│   └── user.model.js      # User schema
├── repositories/
│   ├── book.repo.js       # Data logic for books
│   ├── borrow.repo.js     # Data logic for borrowings
│   └── user.repo.js       # Data logic for users
├── routes/
│   ├── book.route.js      # Book routes
│   ├── borrow.route.js    # Borrow routes
│   └── user.route.js      # User routes
├── node_modules/          # Node dependencies
├── .env                   # Environment variables
└── package.json           # Project metadata and dependencies

**Requirements**
To run this project, ensure that you have the following:
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.9.0",
    "mongoose": "^8.7.0"
    

**Commands and Steps**
1.Clone the repository
2.Install the dependencies: npm install
3.Create a .env file in the root directory and add your environment variables:
    SECRET_KEY=your_secret_key
    MONGO_URI=your_mongo_connection_uri
    PORT=YOUR PORT
4.Start the server: node server.js

**Technologies Used**
Node.js - Backend JavaScript runtime environment
Express - Web framework for Node.js
MongoDB - NoSQL database for storing books, users, and borrow data
Mongoose - MongoDB object modeling tool
JWT - Authentication mechanism
Bcrypt - Password hashing for secure storage

**Author**
Akshita Katiyar
