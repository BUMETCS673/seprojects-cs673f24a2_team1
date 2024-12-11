
# MenuMatch | Code

## Overview

**MenuMatch** is a restaurant review platform designed specifically for users with special dietary needs. It allows users to filter restaurant reviews based on their dietary preferences (e.g., vegan, halal, gluten-free), making it easier to find dining options that fit their requirements.

The project consists of two components:
1. **Backend (Flask)**: This handles the API and business logic.
2. **Frontend (React)**: This is the user interface for the platform.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (for running the React frontend locally)
- [Python 3.x](https://www.python.org/) (for running the Flask backend locally)
- [Docker](https://www.docker.com/) (for running the project using Docker)
- [Docker Compose](https://docs.docker.com/compose/) (to orchestrate multi-container Docker applications)

---

## Running the Project Using Docker

You can run the entire project (both frontend and backend) using Docker in two different environments: **development** and **production**.

### 1. Development Environment

In the development environment, the backend Flask app runs in development mode, and the React app runs with hot-reloading.

#### Steps:

1. Build and start the containers:

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
	```
2. The services should now be accessible at:

-   **Frontend (React)**: http://localhost
-   **Backend (Flask)**: http://localhost:5000
#### Notes:

-   Any changes you make to the source code will be reflected immediately due to the volume mappings in the development setup.

### 2. Production Environment

In the production environment, the Flask app is served via `gunicorn`, and the React app is built and served using `nginx`.

#### Steps:

1.  Build and start the containers in detached mode:
    ```bash
    docker-compose -f docker-compose.prod.yml up --build -d
    ``` 
    
2.  The services should now be accessible at:
    
    -   **Frontend (React)**: http://localhost
    -   **Backend (Flask)**: http://localhost:5000

#### Notes:

-   In production mode, the frontend is optimized and served by Nginx.
-----
## Running the Project Locally

If you prefer to run the project locally without Docker, you can run the backend and frontend independently. Below are the steps for both.

### 1. Backend (Flask) Setup

#### Steps:

1.  Navigate to the `server` directory:
	```bash
	cd server
	```
2. -   Create a virtual environment (optional but recommended):
	```bash
    python3 -m venv venv
    source venv/bin/activate
	```
    
-   Install dependencies:
	```bash
    pip install -r requirements.txt
	```
    
-   Run the Flask app:
	```bash
    python run.py
	```
    
-   The backend should now be running at: http://localhost:8000

### 2. Frontend (React) Setup

#### Steps:

1.  Navigate to the `menumatch` directory:
	```bash
    cd menumatch
	```
    
2.  Install dependencies:
	```bash
    npm install
	```
    
3.  Start the React development server:
	```bash
    npm start
	```
    
4.  The frontend should now be running at: http://localhost:3000

## Docker Tips

### Building and Rebuilding Containers

-   To **build** or **rebuild** a Docker container, use the following command:
	```bash
    docker-compose up --build
	```
    
-   To **stop** and **remove** containers, networks, and volumes:
	```bash
    docker-compose down
	```