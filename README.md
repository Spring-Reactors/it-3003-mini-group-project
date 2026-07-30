# 📚 Library Management System

A full-stack **Library Management System** developed to automate and simplify library operations. The system provides an easy-to-use interface for managing books, authors, publishers, categories and other library-related information. 

This project demonstrates modern full-stack development using a **React frontend**, **Spring Boot REST API backend** and a relational database.

---

## 🚀 Features

### 📖 Book Management
- Add new books
- Update existing book details
- Delete books
- View all available books
- Manage book information including:
  - Title
  - Author
  - Publisher
  - Category
  - Quantity

### ✍️ Author Management
- Add, update, view and delete authors
- Store author information:
  - Full Name
  - Country
  - Email

### 🏢 Publisher Management
- Manage publisher information
- Store:
  - Publisher name
  - Address
  - Contact number
  - Email

### 🗂️ Category Management
- Create and manage book categories
- Organize books based on categories

### 🔄 CRUD Operations
The system supports complete CRUD functionality:

- Create records
- Read records
- Update records
- Delete records

---

# 🛠️ Technologies Used

## Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- Material UI (MUI)

## Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- RESTful API

## Database
- PostgreSQL / MySQL
- Relational Database Design

## Development Tools
- IntelliJ IDEA / Web Storm
- Maven
- Git & GitHub

---

# 🏗️ System Architecture

```
+-------------------+
|   React Frontend  |
|    User Interface |
+---------+---------+
          |
          |
       REST API
          |
          |
+---------v---------+
|  Spring Boot API  |
| Business Logic    |
+---------+---------+
          |
          |
+---------v---------+
|    Database       |
| PostgreSQL/MySQL  |
+-------------------+
```

---

# 📂 Project Structure

The project is divided into two main parts:

- **Backend**  - Spring Boot REST API application
- **Frontend** - React.js user interface application

```
Library-Management-System
│
├── backend
│   │
│   ├── src
│   │   └── main
│   │       │
│   │       ├── java
│   │       │   └── lk
│   │       │       └── ac
│   │       │           └── uoc
│   │       │               └── librarymanagementsystem
│   │       │                   │
│   │       │                   ├── config
│   │       │                   │   └── CorsConfig.java
│   │       │                   │   └── GlobalExceptionHandler.java
│   │       │                   │
│   │       │                   ├── controller
│   │       │                   │   └── AuthorController.java
│   │       │                   │   └── BookController.java
│   │       │                   │   └── CategoryController.java
│   │       │                   │   └── LogController.java
│   │       │                   │   └── MemberController.java
│   │       │                   │   └── PublisherController.java
│   │       │                   │   └── ReservationController.java
│   │       │                   │
│   │       │                   ├── entity
│   │       │                   │   └── Author.java
│   │       │                   │   └── Book.java
│   │       │                   │   └── Category.java
│   │       │                   │   └── Log.java
│   │       │                   │   └── Member.java
│   │       │                   │   └── Publisher.java
│   │       │                   │   └── Reservation.java
│   │       │                   │
│   │       │                   ├── repository
│   │       │                   │   └── AuthorRepository.java
│   │       │                   │   └── BookRepository.java
│   │       │                   │   └── CategoryRepository.java
│   │       │                   │   └── LogRepository.java
│   │       │                   │   └── MemberRepository.java
│   │       │                   │   └── PublisherRepository.java
│   │       │                   │   └── ReservationRepository.java
│   │       │                   │
│   │       │                   └── LibrarymanagementsystemApplication.java
│   │       │
│   │       └── resources
│   │           └── application.properties
│   │
│   └── pom.xml
│
│
├── frontend
│   │
│   ├── public
│   │   ├── favicon.png
│   │   └── index.html
│   │
│   ├── src
│   │   │
│   │   ├── api
│   │   │   └── api.js
│   │   │
│   │   ├── components
│   │   │   └── EntityCrudPage.jsx
│   │   │
│   │   ├── layout
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages
│   │   │   └── Authors.jsx
│   │   │   └── Books.jsx
│   │   │   └── Categories.jsx
│   │   │   └── Dashboard.jsx
│   │   │   └── Logs.jsx
│   │   │   └── Members.jsx
│   │   │   └── Publishers.jsx
│   │   │   └── Reservations.jsx
│   │   │
│   │   ├── App.js
│   │   │
│   │   ├── index.css
│   │   │
│   │   └── index.js
│   │
│   ├── package.json
│   │
│   └── package-lock.json
│
│
├── .gitignore
│
└── README.md
```

## Backend Structure

The backend follows the Spring Boot layered architecture:

- **config**  
  Contains application configuration classes.

- **controller**  
  Handles HTTP requests and provides REST API endpoints.

- **entity**  
  Contains JPA entity classes that represent database tables.

- **repository**  
  Contains repository interfaces for database operations.

- **resources/application.properties**  
  Stores database connection and Spring Boot configuration settings.


## Frontend Structure

The frontend follows a React component-based architecture:

- **api**  
  Contains Axios configurations and API service methods.

- **components**  
  Contains reusable UI components built using React and Material UI.

- **layout**  
  Contains common application layouts such as navigation and page structure.

- **pages**  
  Contains individual application screens.

- **App.js**  
  Main React component responsible for application routing and structure.

- **index.js**  
  Entry point of the React application.

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Nipun-Lakshan/library-management-system.git
```

Navigate into the project:

```bash
cd library-management-system
```

---

# Backend Setup (Spring Boot)

## Requirements

Make sure you have installed:

- Java 21+
- Maven
- MySQL/PostgreSQL Database


## Configure Database

Update the database configuration inside:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/library_management
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## Run Backend

Using Maven:

```bash
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

---

# Frontend Setup (React)

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm start
```

Frontend will start at:

```
http://localhost:3000
```

---

# 🗄️ Database Entities

Main entities included:

- Book
- Author
- Publisher
- Category
- Logs
- Reservations
- Members

---

# 🔗 API Endpoints

Example API structure:

## Authors

```
GET      /api/authors
POST     /api/authors
PUT      /api/authors/{id}
DELETE   /api/authors/{id}
```

## Books

```
GET      /api/books
POST     /api/books
PUT      /api/books/{id}
DELETE   /api/books/{id}
```

## Publishers

```
GET      /api/publishers
POST     /api/publishers
PUT      /api/publishers/{id}
DELETE   /api/publishers/{id}
```

## Categories

```
GET      /api/categories
POST     /api/categories
PUT      /api/categories/{id}
DELETE   /api/categories/{id}
```

---

# 🎯 Learning Objectives

This project helped to understand:

- Full-stack application development
- REST API development
- Spring Boot MVC architecture
- Database relationships using JPA/Hibernate
- React component-based development
- Frontend-backend communication
- CRUD application design

---

## 👨‍💻 Author

## 👥 Authors

| **Name**                           | **Registration Number** | **Index Number** |
|------------------------------------|-------------------------|------------------|
| **A. W. W. A. Nipun Lakshan**      | 2023s20371              | s17618           |
| **D. M. G. G. Y. N. Rathnayake**   | 2023s20126              | s17274           |
| **P. D. S. Wathsala**              | 2023s20177              | s17441           |
| **Nosali De Silva**                | 2023s19958              | s17227           |
| **G. M. D. Ariyarathna**           | 2023s19927              | s17384           |
| **M. Ekanayake**                   | 2023s19985              | s17191           |
| **L. K. G. Bandara**               | 2023s19936              | s17215           |

### Institution
- University of Colombo, Faculty of Science

---

## ⭐ Support

If you find this repository useful, consider giving it a star.

---
