
import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from livekit import api

from config.config import settings

router = APIRouter(prefix="/livekit", tags=["LiveKit"])
logger = logging.getLogger(__name__)

@router.post("/token")
async def create_token():
    room_name = "healthcare-room"
    identity = "patient-user"

    token = (
        api.AccessToken(
            settings.LIVEKIT_API_KEY,
            settings.LIVEKIT_API_SECRET
        )
        .with_identity(identity)
        .with_name("Patient")
        .with_grants(
            api.VideoGrants(
                room_join=True,
                room=room_name,
                can_publish=True,
                can_subscribe=True
            )
        )
    )

    return {
        "token": token.to_jwt(),
        "url":settings.LIVEKIT_URL,
        "room": room_name
    }
