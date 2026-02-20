# TerraZure V2

A modern, containerized dashboard for managing AWS and Azure cloud resources locally, built with **FastAPI** and **React (Vite)**.

## Getting Started

To run the application locally, you simply need Docker installed. You do not need Node.js or Python installed locally anymore.

### 1. Configure Cloud Credentials

Create a `.env` file in the root of the project with your cloud credentials:

```ini
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=us-east-1

AZURE_TENANT_ID=your_tenant_id
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_secret
AZURE_SUBSCRIPTION_ID=your_sub_id
```

### 2. Run the Containerized Application

Ensure Docker Desktop is running, then run:

```bash
docker-compose up --build
```

### 3. Access the Application

- **Frontend UI (React Dashboard):** [http://localhost:5173](http://localhost:5173)
- **Backend API (FastAPI Swagger Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Development

If you prefer to run the applications locally without Docker for faster development:

### Backend

1. `cd backend`
2. `python -m venv venv`
3. `.\venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`
