from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import aws, azure, terraform

app = FastAPI(title="TerraZure API", version="2.0.0")

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aws.router, prefix="/api/aws", tags=["AWS"])
app.include_router(azure.router, prefix="/api/azure", tags=["Azure"])
app.include_router(terraform.router, prefix="/api/terraform", tags=["Terraform"])

@app.get("/")
def read_root():
    return {"message": "Welcome to TerraZure API v2"}
