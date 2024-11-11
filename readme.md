# Pet Care Server

## Overview

The **Pet Care Backend** is the server-side API of the Pet Care website, built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. The backend is secured with **JWT (JSON Web Token)** to manage user authentication and authorization. It supports two types of user roles: **Admin** and **User**, with different permissions and access to the application.

### Features
- **User Authentication**: Secure login and registration using JWT.
- **Role-based Access Control**: Two roles: Admin and User.
  - **Admin**: Full access to all resources, including user management, post approval, and deletion.
  - **User**: Can create, view, and update posts.
- **Error Handling**: Proper error messages with relevant HTTP status codes for various scenarios.

## API Endpoints

Here are the key API endpoints of the backend:

- **/api/auth**
  - `POST /login`: Log in a user and return a JWT.
  - `POST /register`: Register a new user.
  
- **/api/user**
  - `GET /`: Get the current user's profile information.
  - `PUT /`: Update the current user's profile details.

- **/api/post**
  - `GET /`: Get a list of posts.
  - `POST /`: Create a new post.
  - `PUT /:postId`: Update an existing post.
  - `DELETE /:postId`: Delete a post.

---

## Technologies Used

- **Backend**:
  - **Node.js**: JavaScript runtime for building the server-side application.
  - **Express.js**: Web framework for handling routes and requests.
  - **MongoDB**: NoSQL database to store user and post data.
  - **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
  - **JWT**: JSON Web Tokens for securing authentication and authorization.
  
- **Development Tools**:
  - **ESLint**: Linting tool to enforce consistent code style.
  - **Prettier**: Code formatting tool to maintain code style consistency.

---

## Project Setup

### Clone the Repository

First, clone the repository:

```bash
git clone https://github.com/shahinsadik/pet-care-backend.git
cd pet-care-backend

## To Run The Project

To run the project in your device _clone_ the project and then run the following commands

```shell
npm install
npm run start:dev
```

For checking the es linting and to fix the linting run the commands

```shell
npm run lint
npm run lint:fix
```

To make your code organized run the command

```shell
npm run prettier:fix
```
