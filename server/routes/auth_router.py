from fastapi import APIRouter, Response
from schemas.auth_req import UserCreate, LoginReq
from db.mongo_db import users_collection
from core.exceptions import AppException
from services.auth_services import user_creation, user_verify

router = APIRouter(prefix="/auth",tags=["Tasks"])

@router.post("/login")
async def login(res:Response, user_req: LoginReq):
    try:
        user_data = user_req.model_dump()

        is_Exist_User = await users_collection.find_one({"email":user_data["email"]})
        if not is_Exist_User:
            raise AppException( message="Invalid credieantials", status_code=404)

        userId, token = user_verify(user_data, is_Exist_User)
    
        res.set_cookie(key="access_token",value=token,httponly=True,secure=True,samesite="lax",max_age=60)

        return {
            "message": "User Successfully Login",
            "user_id": str(userId),
            "token" : token
        }

    except AppException:
        raise

    except Exception as e:
        error_message = f'Registration failed --- reason: {e}'
        raise AppException( message=error_message,status_code=500 )


@router.post("/register")
async def register(res:Response, user_req: UserCreate):
    try:
        user_data = user_req.model_dump()

        if user_data["role"] == "system_admin":
            raise AppException( message="Invalid role", status_code=403)

        is_Exist_User = await users_collection.find_one({"email":user_data["email"]})

        if is_Exist_User:
            raise AppException( message="User already exist", status_code=409)

        userId, token = await user_creation(user_data)
    
        res.set_cookie(
            key="access_token",
            value=token,
            httponly=True,  # Blocks JS access (prevents XSS leaks)
            secure=True,    # Only transmitted over HTTPS
            samesite="lax", # Mitigates CSRF attacks
            max_age=60    # Expires in 1 hour
        )

        return {
            "message": "User Successfully Created",
            "user_id": str(userId),
            "token" : token

        }

    except AppException:
        raise

    except Exception as e:
        error_message = f'Registration failed --- reason: {e}'
        raise AppException( message=error_message,status_code=500 )




