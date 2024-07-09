# Transactions-Dashboard

MERN stack application for handling product transactions with React frontend and Node.js backend.

## Overview

This is a MERN stack application that fetches data from a third-party API, initializes a MongoDB database with this data, and provides several APIs for querying and displaying the data. The frontend is built using React and displays the data in tables and charts.

## Features

- Fetch data from a third-party API and initialize the MongoDB database
- Provide API endpoints to query transactions
- Display transactions in a table
- Display statistics about transactions
- Display data in bar and pie charts

## Technology Used

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Axios**

### Frontend
- **React.js**
- **Chart.js**
- **Axios**
- **CSS**

## Setup and Run

### Prerequisites

- Node.js (v14 or later)
- MongoDB (running locally or using a service like MongoDB Atlas)
- npm (Node Package Manager)

### Running the Application

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2. Install dependencies for both the backend and frontend:

    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    cd backend
    node server.js
    ```

4. Initialize the database by opening a browser and navigating to:
    ```bash
    http://localhost:5000/api/init
    ```

5. Start the frontend application:
    ```bash
    cd ../frontend
    npm start
    ```

6. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Approach and Challenges

- **Approach**: The application was developed using Node.js with Express.js for the backend and React for the frontend. MongoDB was used as the database, and Mongoose was used as the ORM. The frontend uses Chart.js for data visualization.
- **Challenges**: Ensuring seamless communication between the frontend and backend, handling data fetching and processing, and implementing responsive and interactive charts were some of the challenges faced during the development of this application.

## License

This project is licensed under the MIT License.
