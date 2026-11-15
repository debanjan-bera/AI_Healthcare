from routes.livekit import router as livekit_router
from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from contextlib import asynccontextmanager

from routes.auth_router import router as auth_router
from db.mongo_db import client
from core.exceptions import AppException


@asynccontextmanager
async def lifespan(_app: FastAPI):
    try:
        await client.admin.command("ping")
        print("MongoDB connected")
        yield
    finally:
        await client.close()
        print("MongoDB disconnected")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(AppException)
async def app_exception_handler(_request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.message
        }
    )

app.include_router(auth_router)

app.include_router(livekit_router)

@app.get("/")
def home():
    return{ "message": "Welcome Our Page"}
    


@app.get("/health")
def health():
    return{ "message": "Health check page"}


if __name__ == "__main__":
    uvicorn.run("main:app",host="localhost",port=8080,reload=True)