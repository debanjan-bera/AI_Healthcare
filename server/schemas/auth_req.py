from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Literal



class UserCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: str = Field(min_length=3)
    email : EmailStr
    role : Literal["care_recipient", "doctor", "hospital_admin", "ambulance_driver", "system_admin"]  = 'care_recipient'
    password :str =  Field(min_length=2)

class LoginReq(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email : EmailStr
    password :str =  Field(min_length=2)