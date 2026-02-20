from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# We will use the container network URL if available, else fallback to a local host URL
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://terrazure:password@localhost:5432/terrazure_db"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for FastAPI to get DB sessions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
