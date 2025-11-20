# The Grand Egyptian Museum - Digital Twin

Welcome to the **The Grand Egyptian Museum** project! This application is a "Digital Twin" of the museum, designed to showcase monuments, manage user authentication, and provide an interactive experience.

This guide acts as a tutorial to help you understand the codebase, run it locally on Windows, and deploy it for free to the cloud.

---

## 🏛️ Project Overview & Architecture

This project follows a **Modular Monolith** architecture where the Backend serves the Frontend as static files.

### Tech Stack
*   **Backend**: .NET 8 (C#) - High-performance Web API.
*   **Database**: PostgreSQL - Robust relational database.
*   **ORM**: Entity Framework Core 9 - Data access and migrations.
*   **Frontend**: AngularJS - Legacy but powerful Single Page Application (SPA) framework.
*   **Containerization**: Docker - For consistent deployment.

### 📂 Codebase Walkthrough

Here is a tour of the key directories in `backend/the grand egyptian museum/`:

*   **`Controllers/`**: The entry points for the API.
    *   `AuthController.cs`: Handles Login and Registration. Registration is secured to force the "User" role.
    *   `ValuesController.cs`: (Likely) manages the Cards/Monuments data.
*   **`Models/`**: Defines the shape of data.
    *   `User.cs`: Represents a registered user.
    *   `Cards.cs`: Represents a museum monument (Title, Description, Image, Era, etc.).
*   **`Data/`**: Database logic.
    *   `Storecontext.cs`: The bridge between the code and the PostgreSQL database.
    *   `DataSeeder.cs`: **Cold Start Fix**. Automatically adds an Admin user and sample monuments (Sphinx, Ramses II) if the database is empty. It also runs Auto-Migrations.
*   **`wwwroot/`**: The Frontend lives here!
    *   Contains `index.html`, `.js` files, and `images`.
    *   The backend is configured to serve these files and fallback to `index.html` for SPA routing.
*   **`Program.cs`**: The application startup. Configures Middleware, DB connections, and Dependency Injection.
*   **`Dockerfile`**: Instructions for building the app inside a container.

---

## 💻 Local Development Guide (Windows)

Follow these steps to run the project on your local machine.

### 1. Prerequisites
Install the following software:
*   **[PostgreSQL](https://www.postgresql.org/download/windows/)**: The database server.
*   **[.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)**: Required to build and run the code.
*   **[Visual Studio Code](https://code.visualstudio.com/)** or **Visual Studio 2022**.

### 2. Database Setup
1.  Open **pgAdmin** (comes with PostgreSQL) or a terminal.
2.  Create a new database named `grandmuseum`.
    *   *Note*: The default connection string assumes `User=postgres` and `Password=postgres`.
3.  If your password is different, update `backend/the grand egyptian museum/appsettings.json`:
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Database=grandmuseum;Username=postgres;Password=YOUR_PASSWORD"
    }
    ```

### 3. Running the Application
1.  Open your terminal (PowerShell or Command Prompt).
2.  Navigate to the project folder:
    ```powershell
    cd "backend/the grand egyptian museum"
    ```
3.  Run the application:
    ```powershell
    dotnet run
    ```
    *   *First Run Magic*: The app will automatically create the database tables and seed the initial data (Admin user & Monuments) thanks to `DataSeeder.cs`.
4.  Open your browser and visit: `http://localhost:5176` (or the port shown in the terminal).

---

## ☁️ Free Deployment Guide (Render.com)

We will use **Render.com** because it supports Docker and has a free tier.

### Step 1: Prepare the Database (Neon.tech or Render Postgres)
Since Render's free web services spin down, it's best to use a free managed Postgres database.
1.  Go to [Neon.tech](https://neon.tech) (Generous free tier).
2.  Create a project and copy the **Connection String** (looks like `postgres://user:pass@endpoint...`).

### Step 2: Deploy the App on Render
1.  Push this code to a **GitHub Repository**.
2.  Log in to [Render.com](https://render.com).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Configure the Service**:
    *   **Runtime**: Select **Docker**.
    *   **Region**: Choose one close to you (e.g., Frankfurt or Oregon).
    *   **Instance Type**: Free.
6.  **Environment Variables** (Advanced):
    *   Add a generic environment variable for the database connection.
    *   Key: `ConnectionStrings__DefaultConnection` (Note the double underscore).
    *   Value: Paste your connection string from Step 1.
    *   *Alternatively*, you can edit `appsettings.json` before pushing, but Environment Variables are safer.
7.  Click **Create Web Service**.

### Step 3: Verification
Render will build the Docker image (using the `Dockerfile` we created).
*   It will restore .NET packages.
*   It will copy the `wwwroot` frontend.
*   It will start the app.
*   **On Startup**: The `DataSeeder` will run, migrate your cloud database, and seed the data.

Open your Render URL (e.g., `https://grand-museum.onrender.com`). You should see the site live with the Sphinx and Ramses II images!

---

## 🔐 Default Credentials (Seeded)

If you log in with these credentials, you will have Admin access:
*   **Username**: `admin`
*   **Password**: `admin123`
