from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.core.config import FRONTEND_ORIGIN

app = FastAPI(
    title="CollabAgent API",
    description="Backend API for the CollabAgent workspace",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Welcome to CollabAgent API",
        "status": "online",
    }


app.include_router(
    health_router,
    prefix="/api",
    tags=["Health"],
)
