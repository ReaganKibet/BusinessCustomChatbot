import os
import logging
from fastapi import FastAPI
from routes import chat, admin, analytics, auth
from database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database tables
create_db_and_tables()

# Include API routes
app.include_router(chat.router, prefix="/chat", tags=["Chatbot"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])

@app.get("/")
def home():
    return {"message": "Welcome to the AI Business Chatbot API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
