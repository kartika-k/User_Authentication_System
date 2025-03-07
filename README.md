# Assignment Project

This is a full-stack web application that includes user authentication, password reset functionality, and a dashboard. The project is built using React for the frontend and Node.js with Express and MongoDB for the backend.

## Features

- User Signup
- User Login
- Password Reset
- Protected Routes
- Dashboard

## Technologies Used

- Frontend: React, Axios, CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/kartika-k/User_Authentication_System.git
cd User_Authentication_System
```
## Install Dependencies

### For the Backend

```bash
cd server
npm install
```

### For the Frontend

```bash
cd ../client
npm install
```

## Environment Variables
Create a .env file in the server directory and add the following environment variables:

```bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/auth
KEY=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## Running the Project
### Start the Backend Server
```bash
cd server
npm start
```

### Start the Frontend Development Server
```bash
cd ../client
npm start
```

## Access the Application
Open your browser and navigate to http://localhost:3000 to access the application.

## Project Structure
```bash
assignment-project/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Home.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Dashboard.jsx
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
├── server/
│   ├── models/
│   │   ├── User.js
│   ├── routes/
│   │   ├── user.js
│   ├── .env
│   ├── index.js
│   ├── package.json
```

## API Endpoints
### User Routes
```bash
POST /auth/signup - User Signup
POST /auth/login - User Login
POST /auth/forgot-password - Forgot Password
POST /auth/reset-password/:token - Reset Password
GET /auth/verify - Verify User
GET /auth/logout - Logout User
```
## Screenshots

![image](https://github.com/user-attachments/assets/af6cae30-f0e6-40df-85bd-efab6b261dec)

![image](https://github.com/user-attachments/assets/cf5cd56d-d091-40ee-9171-2126f124a3be)

![image](https://github.com/user-attachments/assets/757ab717-5a75-4840-8c6f-72d71e670d53)

![image](https://github.com/user-attachments/assets/0ad313c9-b0ac-4520-8afc-aa4e4509b596)

## DataBase

<img width="803" alt="image" src="https://github.com/user-attachments/assets/b76b80b2-8b34-4881-a6bd-5ced8c0538cf" />

