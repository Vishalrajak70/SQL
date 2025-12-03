# User Management App (Node.js + Express + MySQL + EJS)

A simple user management web application built using **Node.js**,
**Express**, **MySQL**, and **EJS templating**.\
This app allows you to **view users**, **edit username**, and **validate
password** before update.

## Features

-   Display first **100 users** from database\
-   Edit a user's username\
-   Password verification before update\
-   EJS templating with clean UI\
-   MySQL database connection\
-   RESTful routes using `method-override`

## Project Structure

    project/
    │── views/
    │   ├── home.ejs
    │   ├── users.ejs
    │   ├── edit.ejs
    │── index.js
    │── package.json

## Installation & Setup

### Install dependencies

``` bash
npm install express mysql2 ejs method-override @faker-js/faker
```

### Setup MySQL Database

``` sql
CREATE DATABASE delta_app;

USE delta_app;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(50)
);
```

## Start Server

``` bash
node index.js
```

Server runs at:\
http://localhost:8080

## Available Routes

-   **GET /** -- Home page showing total users\
-   **GET /user** -- Shows first 100 users\
-   **GET /user/:id/edit** -- Form to edit username\
-   **PATCH /user/:id** -- Updates username after password check

## Technologies Used

-   Node.js\
-   Express.js\
-   MySQL\
-   EJS\
-   Faker.js\
-   Method Override
