# 📚 BookDiary – Full Stack SPA

BookDiary is a Single Page Application (SPA) for managing and tracking books you’ve read, are reading, or want to read.
It is built with:

Frontend: Angular

Backend: Spring Boot (Java)

Database: MySQL



📌 Project Overview

This is a Single Page Application (SPA) built with Angular (frontend) and Spring Boot (backend).
The backend provides REST APIs, and the frontend consumes them to deliver a seamless user experience.

The project is split into two separate GitHub repositories:

Frontend (Angular) – UI and client-side logic
https://github.com/alexdkv/BookDiary.git

Backend (Spring Boot / Java) – REST API, business logic and security
https://github.com/alexdkv/BookDiary-backend.git

# ⚙️ Prerequisites
Before running the project, make sure you have:

Node.js (LTS version) & npm (comes with Node) – [Download](https://nodejs.org/)

Java 17+ - [Download](https://www.oracle.com/java/technologies/downloads/)

Angular CLI – Install globally via: npm install -g @angular/cli

Maven – Download (if not bundled with your IDE) [Download](https://maven.apache.org/)

Git

MySQL Database

# 🚀 Running the Project locally

# 1. Clone the repositories

 Backend
git clone <backend-repo-url>
cd backend

 Frontend (in a separate folder)
git clone <frontend-repo-url>
cd frontend

# 2.Run The backend

2.1
cd backend

2.2 Configure database  environment variables

export db_username=root
export db_password=yourpassword

(or for Windows PowerShell)

setx db_username "root"
setx db_password "yourpassword"

2.3
mvn clean install
mvn spring-boot:run

2.4 
Backend should be working at http://localhost:8080

# 3.Start the frontend

3.1
cd frontend

3.2 Install dependancies
npm install

3.3
ng serve

3.4
Open in browser on http://localhost:4200

# 🖥️ Project Structure

1. Public Area (Accessible Without Login)
The public section allows visitors to explore the platform and preview book information without creating an account.

🏠 Home Page

Displays a curated collection of all available books.

Showcases book covers, titles, authors, and brief descriptions.

Serves as the entry point for discovering content.

📖 Book Details Page

Visitors can view comprehensive details about any selected book.

Shows the average rating from all users.

Ratings can only be given by logged-in users (guests cannot rate).

🔑 Login Page

Allows registered users to securely sign in and access their personal dashboard.

Implements validation for credentials and error feedback.

📝 Registration Page

New users can create an account by providing the required information.

Includes form validation and password rules for security.

2. Private Area (Authenticated Users Only)
Once logged in, users gain access to additional features for managing their personal reading experience.

🔍 Discover Page

A searchable collection of all books in the system.

Includes a search bar for filtering by:

Book Title

Author Name

Combination of both

Provides quick access to details and ratings.

👤 My Profile Page

Personal library management tools:

Add new books (title, author, cover, description, status).

Edit or delete books the user has added.

Sort books by status:

✅ Read

📚 Want to Read

📖 Reading

Displays books in a clean, grid-based layout with cover previews.

📖 Book Details Page (Private View)

All information from the public book details view, plus:

The ability for the logged-in user to submit their own rating.

Updates the average rating dynamically.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.