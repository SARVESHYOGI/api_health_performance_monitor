from fastapi import APIRouter, Depends
from app.schemas.api_check import ApiCheckRequest, ApiCheckResponse
from app.services.api_checker import check_api_service

router = APIRouter()


@router.post("/check-api", response_model=ApiCheckResponse)
async def check_api(data: ApiCheckRequest):
    result = await check_api_service(data)
    return result
