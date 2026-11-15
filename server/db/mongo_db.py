from pymongo import AsyncMongoClient
from config.config import settings


client = AsyncMongoClient(settings.MONGO_URI)

db = client[settings.DATABASE_NAME]

users_collection = db["users"]