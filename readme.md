This is an application which can create custom Gallery Images. You can fetch images using Unsplash API and save them to mongo database.
Application is dockerized completely, so all you need to run this app is to create .env.local files and just run using docker command (look step [Installation](#installation))

## Overview

* frontend: React.js app (used react-bootstrap and TailwindCSS)
* backend: Python (used Flask)
* database: mongodb + mongo-express


## Requirements

1. [Node.js](https://nodejs.org/)
2. [Python](https://www.python.org/)
3. [Docker](https://www.docker.com/)

## Packages

### 1. [**Frontend**](https://github.com/Jullew/projekt-chmurowe-aeh/tree/main/frontend)
This application is the primary user-facing application. Once it's up and running, it's available on https://localhost:3000

### 2. [**Backend**](https://github.com/Jullew/projekt-chmurowe-aeh/tree/main/api)
This application is responsible for logical part of app, connect with database and with UnsplashAPI to fetch images. By default api is ready on https://localhost:5050

### 3. **Database**
Database is dockerized and initial from original image from Docker Hub. 
Database UI is ready on https://localhost:8081

## Installation

### 1. **Clone the application**

```sh
git clone https://github.com/Jullew/projekt-chmurowe-aeh
```

### 2. **Set up environment variables**

To run this app necessary is to set up environment variables.

Go to frontend folder and 

Copy `.env.local.example` and change name to `.env.local`

Then go to api folder and to the same

Copy `.env.local.example` and change name to `.env.local`

Then open `.env.local` and add the missing environemtn variables:

- `UNSPLASH_KEY=your-unsplash-api-key` - create an account at https://unsplash.com and set up API token
- `MONGO_USERNAME=root` - choose your database name
- `MONGO_PASSWORD=` - choose your password

### 3. **Set up database details**

Open `docker-compose` file in root folder and change database details you have choosen step before.

### 4. **Run and build docker-compose**

Use command

`docker-compose up --build`

if process is finished you can simply run frontend app `https://localhost:3000` and enjoy of this app.