from pwdlib import PasswordHash
from db.mongo_db import users_collection
from config.config import settings
from core.exceptions import AppException
from datetime import datetime, timezone, timedelta
import jwt


def createJWT(id:str)->str:
    payload = {
            "sub": id,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=1)
        }
    token = jwt.encode(payload, settings.JWT_SECRET, settings.JWT_ALGORITHM)
    return token

async def user_creation (user_data):
    password_hash =  PasswordHash.recommended()
    user_data["password"] = password_hash.hash(password=user_data["password"])
    
    res = await users_collection.insert_one(user_data)
    userId = str(res.inserted_id)
    token: str = createJWT(userId)

    return userId, token

def user_verify(user_req, exit_user):
    userId = str(exit_user["_id"])
    hash_password = exit_user["password"]
    password_hash =  PasswordHash.recommended()
    password_verify = password_hash.verify(user_req["password"], hash_password)

    if not password_verify:
        raise AppException( message="Invalid credieantials",status_code=401 )

    token = createJWT(userId)
    return userId, token

    
