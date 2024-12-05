**Online Bookstore Web Application**

**Project Overview**
This is a full-stack web application for managing an online bookstore. The application enables users to perform CRUD operations on a list of books, including adding new books, viewing all books, updating book details, and deleting books. Additionally, the application features a user authentication system with login and signup functionality.

**Task Objective**
The primary goal was to develop and deploy a simple bookstore application that includes:

Backend API for CRUD operations on books.
Frontend interface for interacting with the API.
User authentication (login and signup).

Features
**1. Backend (Node.js, Express.js, MongoDB)**

**User Authentication**
GET /api/users/signup : For signup.
GET /api/users/login : for login.
GET /api/users/forgot-password : for forgot password.
GET /api/users//reset-password/:token : fpr reset password token.

**CRUD API for book management:**

GET /api/leads/getleads/:id: Retrieve all books.
POST /api/leads/createLeads: Add a new book.
GET /api/leads/getSpecificLead/:id: Retrieve a specific book by ID.
PUT /api/leads/update/:id: Update book details.
DELETE /api/leads/delete/:id: Delete a book by ID.


**2. Frontend (React.js/Next.js)**

**Book Management:**

Display a list of all books.
Forms to add new books and update existing ones.
Ability to delete books from the list.

**User Authentication:**

Signup form for creating an account.
Login form for existing users to access the application.
Restricted access to book management features for authenticated users only.

**Navigation:**

Use of React Router for smooth navigation between pages.
Pages: Home, Add Book, Edit Book, Login, Signup

**Styling:**

Clean and responsive UI using CSS .
Technologies Used
Backend:
Node.js
Express.js
MongoDB with Mongoose
Frontend:
React.js
React Router for navigation
Axios for API calls
CSS for styling
