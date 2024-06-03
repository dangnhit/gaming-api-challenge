#  Gaming API Challenge for interview assessment

## Overview
This project is a backend application built using Node.js, Express.js, and PostgreSQL. The application allows users to perform basic CRUD operations on a resource related to gaming. Additionally, the project includes basic security measures and utilizes Git for version control.

## Features

- **TypeScript First**: The entire codebase is written in TypeScript for better type safety and developer experience.
- **RESTful API** with CRUD operations for a gaming-related resource (e.g.user, user profiles, game, virtual items, user items, game scores).
- Integration with a chosen database system (**PostgreSQL** in this case).
- **JWT Authentication with Role-Based Authorization**: Secure API endpoints with JSON Web Tokens (JWT) and manage permissions using role-based access control.
- Version control using Git, with the repository hosted on GitHub.

## Design Decisions and Assumptions

- **Resource Choice**: For the purpose of this project, the resources chosen are ***User**, **User Profile**, **Game**, **Virtual Item**, **User Item**, **Game Score***.
- **Database**: PostgreSQL is used for its robustness and ability to handle complex queries.
- **Authentication**: JWT (JSON Web Token) is used for authentication to ensure secure API access.
- **Authorization**: Role-based access control is implemented to manage permissions for different users.
- **Error Handling**: Proper error handling is implemented to provide meaningful error messages and ensure the robustness of the API.

## Prerequisites
- [Node.js](https://nodejs.org/en) (recommend latest version)
- [PostgreSQL](https://www.postgresql.org/download/) (v14 or higher)

## Installation
##### 1. Clone the repository
- `git clone https://github.com/dangnhit/gaming-api-challenge.git`
- `cd gaming-api-challenge`

##### 2. Install dependencies
- `npm install`

##### 3. Setup environment variables
Create a .env file in the root directory with the following variables:

```
PORT = 5001

DB_HOST = 127.0.0.1
DB_PORT = 5432
DB_USER = postgres
DB_PASSWORD = 1
DB_NAME = gamingdev

JWT_SECRET=dfdhhf8gh523reh6qedn37dferpoawdn381j
JWT_EXPIRATION=15m

STORAGE_BUCKET = fs://.storage/development/storage
REGION = 
```

##### 4. Start the application
- `npm run dev`

# Conclusion
This project demonstrates the ability to design and implement a backend application with Node.js, Express.js, and TypeScript, integrate it with PostgreSQL, apply basic security measures, and use version control effectively. Further improvements can be discussed during the technical interview.
