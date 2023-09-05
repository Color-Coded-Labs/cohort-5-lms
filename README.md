# Cohort-5-LMS

A Learning Management System (LMS) built using the MERN stack. This project consists of a `client` folder that contains the React frontend and a `server` folder containing the Express backend.

## Tech Stack

- **M**ongoDB Atlas - Database
- **E**xpress.js - Backend Framework
- **R**eact.js - Frontend Library
- **N**ode.js - Backend Runtime

## Prerequisites

- Node.js and npm installed
- MongoDB Atlas account

## Folder Structure

```plaintext
cohort-5-lms/
├── client/          # React frontend
├── server/          # Express backend
└── README.md        # This file
```

### Client (Frontend)

Inside the `client` folder, the project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app), so the folder structure is straightforward.

```plaintext
client/
├── node_modules/
├── public/
├── src/
├── package.json
└── README.md
```

#### Running the client

Navigate to the `client` directory:

```bash
cd client
```

Install the dependencies:

```bash
npm install
```

Run the React app:

```bash
npm start
```

The frontend will start on `http://localhost:3000`.

### Server (Backend)

Inside the `server` folder, the project uses Express.js.

```plaintext
server/
├── node_modules/
├── routes/
├── models/
├── app.js
├── package.json
└── .env               # Environment variables
```

#### Running the server

Navigate to the `server` directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Run the server:

```bash
npm start
```

The server will start, by default it will run on `http://localhost:8000`.

## Environment Variables

You will need to set up environment variables for the server.

### Server

Inside the `server` directory, create a `.env` file to include:

```env
MONGO_URI=your_mongodb_atlas_uri_here
PORT=8000
```

Replace `your_mongodb_atlas_uri_here` with your actual MongoDB Atlas URI.