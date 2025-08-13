📚 BookDiary – Full Stack SPA
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

⚙️ Prerequisites
Before running the project, make sure you have:

Node.js (LTS version) & npm (comes with Node) – [Download](https://nodejs.org/)

Java 17+ - [Download](https://adoptium.net/)

Angular CLI – Install globally via: npm install -g @angular/cli

Maven – Download (if not bundled with your IDE) [Download](https://maven.apache.org/)

Git

MySQL Database

🚀 Running the Project locally

1. Clone the repositories

# Backend
git clone <backend-repo-url>
cd backend

# Frontend (in a separate folder)
git clone <frontend-repo-url>
cd frontend

2.Run The backend

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

3.Start the frontend

3.1
cd frontend

3.2 Install dependancies
npm install

3.3
ng serve

3.4
Open in browser on http://localhost:4200

🖥️ Project Structure

1. Public part

-Home page - loading collection of all books
-Book details page- Not authenticated users can preview book details and average rating(only logged-in users can rate)
-Login
-Register

2.Private part

-Discover page - A collection with all books and search bar, that provides search by book title and/or author
-My Profile page - Add books, edit and delete all your added books, and sort them by book status (Read, Want to Read, Reading)
-Book details page - Can preview information about a book, look average rating and rate a book yourself.


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.