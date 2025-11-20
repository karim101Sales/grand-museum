# The Grand Egyptian Museum - Digital Twin


Welcome to the **The Grand Egyptian Museum** project! This application is a "Digital Twin" of the museum, designed to showcase monuments, manage user authentication, and provide an interactive experience.

This guide acts as a tutorial to help you understand the codebase, run it locally (via Code or Docker), and deploy it for free to the cloud using **Koyeb** and **Neon**.

---

## 🏛️ Project Overview & Architecture

This project follows a **Modular Monolith** architecture where the Backend serves the Frontend as static files.

### Tech Stack
* **Backend**: .NET 8 (C#) - High-performance Web API.
* **Database**: PostgreSQL - Robust relational database.
* **ORM**: Entity Framework Core 9 - Data access and migrations.
* **Frontend**: AngularJS - Legacy but powerful Single Page Application (SPA) framework.
* **Containerization**: Docker - For consistent deployment.

### 📂 Codebase Walkthrough

Here is a tour of the key directories in `backend/the grand egyptian museum/`:

* **`Controllers/`**: The entry points for the API (e.g., `AuthController.cs` for login/register).
* **`Models/`**: Defines the shape of data (`User.cs`, `Cards.cs`).
* **`Data/`**: Database logic. `DataSeeder.cs` automatically seeds an Admin user and monuments on startup.
* **`wwwroot/`**: The Frontend lives here (`index.html`, images, js).
* **`Dockerfile`**: Instructions for building the app inside a container.

---

## 🐳 Local Development Guide (Docker)

The easiest way to run the application locally is using Docker, as it simulates the production environment.

### 1. Prerequisites
* **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: Installed and running.
* **Neon Database**: A generic PostgreSQL connection string from [Neon.tech](https://neon.tech).

### 2. Build the Image
Navigate to the project folder in your terminal and build the image:

```powershell
cd "backend/the grand egyptian museum"
docker build -t grandmuseum .
````

### 3\. Run the Container

Run the container by passing your database connection string as an environment variable.

> **Important:** You must format the connection string as `Key=Value` (not the default `postgresql://` URL) for .NET to read it correctly.

**Format:** `Host=...;Database=...;Username=...;Password=...;Ssl Mode=Require`

```powershell
docker run -p 8080:8080 -e "ConnectionStrings__DefaultConnection=Host=ep-jolly-breeze-a4n47zlq-pooler.us-east-1.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=YOUR_PASSWORD;Ssl Mode=Require" grandmuseum
```

Open your browser and visit: `http://localhost:8080`

-----

## ☁️ Free Deployment Guide (Koyeb)

We use **Koyeb** for hosting because it has a generous free tier and excellent Docker support.

### Step 1: Database Setup (Neon.tech)

1.  Create a free project on [Neon.tech](https://neon.tech).
2.  Copy the **Connection String**.
3.  **Crucial:** Convert the connection string from the URL format (`postgresql://...`) to the Key-Value format needed for .NET:
      * *From:* `postgresql://user:pass@host/db?sslmode=require`
      * *To:* `Host=host;Database=db;Username=user;Password=pass;Ssl Mode=Require`

### Step 2: Deploy on Koyeb

1.  Push your code to **GitHub**.
2.  Log in to **[Koyeb.com](https://www.koyeb.com)** and create a new **Web Service**.
3.  Select **GitHub** as the source and choose your repository.

### Step 3: Configure Build Settings (Important)

Since the project is in a subfolder, you must configure the builder exactly as follows:

  * **Builder**: Dockerfile
  * **Work Directory**: `backend/the grand egyptian museum`
      * *This tells Koyeb to enter this folder before building.*
  * **Dockerfile Location**: `Dockerfile`
      * *Since we changed the Work Directory, the file is now right there.*

### Step 4: Environment Variables

Add the database connection so the app can start and seed data.

  * **Key**: `ConnectionStrings__DefaultConnection` (Note the double underscore `__`)
  * **Value**: Your **Key=Value** formatted connection string from Step 1.

### Step 5: Ports

  * **Port**: Change the exported port from `8000` to **`8080`**.
      * *This matches the `EXPOSE 8080` instruction in our Dockerfile.*

Click **Deploy**. The app will build, run the database migrations automatically, and go live\!

-----

## 🔐 Default Credentials (Seeded)

On the first deployment, the app will automatically create an Admin user:

  * **Username**: `admin`
  * **Password**: `admin123`
