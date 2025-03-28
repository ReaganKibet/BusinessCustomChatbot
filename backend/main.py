from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from routes import chat, admin
import asyncio

# Create FastAPI app with minimal settings
app = FastAPI(
    title="Restaurant AI Chat",
    docs_url=None,  # Disable Swagger UI for faster startup
    redoc_url=None  # Disable ReDoc for faster startup
)

# Optimize CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],  # Limit to only needed methods
    allow_headers=["*"],
    max_age=86400,  # Cache preflight requests for 24 hours
)

# Lazy database initialization
async def init_db():
    Base.metadata.create_all(bind=engine)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(init_db())  # Non-blocking DB initialization

# Include only necessary routes
app.include_router(chat.router, prefix="/chat")
app.include_router(admin.router, prefix="/admin")

@app.get("/")
def home():
    return {"message": "Welcome to the AI Business Chatbot API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
